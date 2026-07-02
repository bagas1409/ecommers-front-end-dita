

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  description?: string;
  weight?: number;
}

export interface ICartItem {
  productId: Schema.Types.ObjectId | string;
  quantity: number;
}

export interface ICart {
  _id?: string;
  userId: Schema.Types.ObjectId | string;
  items: ICartItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPopulatedCartItem {
  productId: IProduct;
  quantity: number;
}

export interface IPopulatedCart {
  _id: string;
  userId: string;
  items: IPopulatedCartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartResponse {
  success: boolean;
  cart?: IPopulatedCart;
  message?: string;
  subtotal?: number;
  totalItems?: number;
}
