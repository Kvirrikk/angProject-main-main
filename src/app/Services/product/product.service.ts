import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BasketItem } from '../../Models/Product';
import { RegisterUser } from '../../register/register.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : ApiService) { }

  getProducts() {
    return this.http.getApi("https://restaurant.stepprojects.ge/api/Products/GetAll")
}

  getProdCategory() {
    return this.http.getCategory("https://restaurant.stepprojects.ge/api/Categories/GetAll")
}

getProdCategoryId(cateId : number) {
  return this.http.getProdCategory(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${cateId}`)
}

addToTheBasket(data: BasketItem) {
  return this.http.addToBasket(data, "https://restaurant.stepprojects.ge/api/Baskets/AddToBasket")
}

updateInBasket(data: BasketItem) {
  return this.http.updateBasket(data, "https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket")
}
 
getBasket() {
  return this.http.getTheBasket('https://restaurant.stepprojects.ge/api/Baskets/GetAll')
}

 register(user : RegisterUser){
      return this.http.post("https://rentcar.stepprojects.ge/api/Users/register", user)
  }

    logIn(user : RegisterUser){
      return this.http.post("https://rentcar.stepprojects.ge/api/Users/login", user)
  }



}
