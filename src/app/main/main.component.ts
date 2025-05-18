import { Component, signal } from '@angular/core';
import { UserService } from '../Services/product/product.service';
import { Router } from '@angular/router';
import { Products } from '../Models/Product';
import { forkJoin, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ApiService } from '../Services/api.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  basket: any[] = []
  products: Products[] = []
  category: any[] = []
  selectedCategoryId: number | null = null



  constructor(
    private api : UserService, 
    private router: Router,
    private productService: UserService,  
    private apiService: ApiService,
  ){ }




    filters = {
      vegeterian: null as boolean | null,
      nuts: null as boolean | null,
      spiciness: null as number | null,
      categoryId: null as number | null
    }
    
    applyFilters() {
      let { vegeterian, nuts, spiciness, categoryId } = this.filters
    
      if (vegeterian === null && nuts === null && spiciness === null && categoryId === null) {
        this.api.getProducts().subscribe(resp => {
          this.products = resp
        })
        return;
      }
    
      let params: any = {}
      if (vegeterian !== null) params.vegeterian = vegeterian
      if (nuts !== null) params.nuts = nuts
      if (spiciness !== null) params.spiciness = spiciness
      if (categoryId !== null) params.categoryId = categoryId
    
      this.apiService.getFiltered(params).subscribe(resp => {
        this.products = resp
      });
    }

    resetFilters() {
      this.filters = {
        vegeterian: null,
        nuts: null,
        spiciness: null,
        categoryId: null
  };
      this.applyFilters(); 
}

    

    getBasket() {
      this.productService.getBasket().subscribe((resp) => {
        this.basket = resp;
      });
    }
    
    addToBasket(product: any) {
      let existing = this.basket.find(p => p.productId === product.id);
    
      if (existing) {
        this.updateQuantity(existing, 1); 
      } else {
        let quantitySignal = signal(1);
        let priceSignal = signal(product.price);
    
        let newItem = {
          productId: product.id,
          name: product.name,
          quantity: quantitySignal,
          price: priceSignal,
          originalPrice: product.price
        };
    
        this.productService.addToTheBasket({
          productId: newItem.productId,
          quantity: quantitySignal(),
          price: priceSignal(),
          name: newItem.name,
          originalPrice: newItem.originalPrice
        }).subscribe(res => {
          console.log('Added to basket:', res);
          this.basket.push(newItem); 
        });
      }
    }
    

    updateQuantity(item: any, change: number) {
      let currentQuantity = item.quantity();
      let newQuantity = currentQuantity + change;
    
      if (newQuantity <= 0) {
        this.apiService.deleteProductFromBasket(item.productId).subscribe(() => {
          this.basket = this.basket.filter(p => p.productId !== item.productId);
        });
      } else {
        item.quantity.set(newQuantity);
    
        let unitPrice = item.originalPrice ?? (item.price() / currentQuantity);
        item.originalPrice = unitPrice;
        item.price.set(unitPrice * newQuantity);
    
        this.productService.updateInBasket({
          productId: item.productId,
          quantity: item.quantity(),
          price: item.price(),
          name: item.name,
          originalPrice: item.originalPrice
        }).subscribe();
      }
    }
    
    
    
    

    removeFromBasket(productId: number) {
      this.apiService.deleteProductFromBasket(productId).subscribe(
        (response) => {
          console.log('Product deleted:', response);
    
          this.basket = this.basket.filter(item => item.productId !== productId);
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
    
    


    getTotalPrice(): number {
      return this.basket.reduce((sum, item) => {
        return sum + (item.price() || 0); 
      }, 0);
    }
    
    
    
    


    onCateSelect() {
      if (this.selectedCategoryId !== null) {
        this.productService.getProdCategoryId(this.selectedCategoryId).subscribe((resp) => {
          this.products = resp.products
        })
      } else {

        this.api.getProducts().subscribe((resp) => {
          this.products = resp 
        })
      }
    }

    purchase() {
      if (this.basket.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Your basket is empty',
          text: 'Add at least one product before buying it.',
          confirmButtonText: 'Okay'
        });
        return;                          
      }
    
      let deleteRequests = this.basket.map(product =>
        this.apiService.deleteProductFromBasket(product.productId)
      );
    
      forkJoin(deleteRequests).subscribe({
        next: () => {
          this.basket = [];
          Swal.fire({
            icon: 'success',
            title: 'Purchase completed!',
            text: 'Your product will be delivered soon',
            confirmButtonText: 'Alright'
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Oops…',
            text: 'Something went wrong while processing your order.',
            confirmButtonText: 'Try again'
          });
        }
      });
    }
    
  products$ ? : Observable<any>

  ngOnInit(){
      this.products$ = this.api.getProducts();
      this.products$.subscribe(resp => {
        this.products = resp
        console.log(resp)

        this.productService.getProdCategory().subscribe((resp) => {
          this.category = resp
        })
        
      })
  }

}
























    // addToBasket(product: any) {
    //   let existing = this.basket.find(p => p.productId === product.id);
    
    //   if (existing) {
    //     this.updateQuantity(existing, 1); 
    //   } else {
    //     let newItem = {
    //       productId: product.id,
    //       name: product.name,
    //       quantity: 1,
    //       price: product.price
    //     };
    
    //     this.productService.addToTheBasket({
    //       productId: newItem.productId,
    //       quantity: newItem.quantity,
    //       price: newItem.price,
    //       name: '',
    //       originalPrice: 0
    //     }).subscribe(res => {
    //       console.log('Added to basket:', res);
    //       this.basket.push(newItem); 
    //     });
    //   }
    // }




// updateQuantity(item: any, change: number) {
    //   let newQuantity = item.quantity + change;
    //   if (newQuantity <= 0) {
    //     this.apiService.deleteProductFromBasket(item.productId).subscribe(() => {
    //       this.basket = this.basket.filter(p => p.productId !== item.productId);
    //     });
    //   } else {
    //     item.quantity = newQuantity;
        
  
    //     let unitPrice = item.originalPrice ?? (item.price / (item.quantity - change));
    //     item.originalPrice = unitPrice; 
    //     item.price = unitPrice * newQuantity;
    
    //     this.productService.updateInBasket({
    //       productId: item.productId,
    //       quantity: item.quantity,
    //       price: item.price,
    //       name: '',
    //       originalPrice: 0
    //     }).subscribe();
    //   }
    // }



