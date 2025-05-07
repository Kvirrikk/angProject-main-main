import { signal, Signal } from "@angular/core";

export class Products{
    id?: number;
    name!: string;
    price!: number;
    image!: string;
    nuts!: boolean;
    vegeterian!: boolean;
    spiciness!: number;
  }

  export interface BasketItem {
      productId: number; 
      name: string; 
      originalPrice: number; 
      quantity: number; 
      price: number; 
  }


  