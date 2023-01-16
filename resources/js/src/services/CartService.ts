import api from "../api";
import { ICart } from "../types/models";

export interface AddToCartParams {
  product_id: number;
  city: string;
  product_variant_id: number;
}

export default class CartService {
  static addToCart(body: AddToCartParams) {
    return api.post<ICart>("/cart/add", body);
  }

  static getCart() {
    return api.get<ICart>("/cart");
  }
}
