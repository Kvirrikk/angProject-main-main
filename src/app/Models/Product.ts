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
    quantity: number;
    price: number;
    productId: number;
  }