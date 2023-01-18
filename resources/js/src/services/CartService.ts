import api from "../api";
import { ICart } from "../types/models";

export interface UpdateCartParams {
  product_id: number;
  city?: string;
  product_variant_id: number;
}

export interface UpdateQuantityParams {
  item_id: string;
  type: "reduce" | "add";
}

export interface RemoveItemParams {
  item_id: string;
}

export default class CartService {
  static getCart() {
    return api.get<ICart>("/cart");
  }

  static addToCart(body: UpdateCartParams) {
    return api.post<ICart>("/cart/add", body);
  }

  static updateQuantity(body: UpdateQuantityParams) {
    return api.post<ICart>("/cart/update-quantity", body);
  }

  static removeItemFromCart(body: RemoveItemParams) {
    return api.post<ICart>("/cart/remove-item", body);
  }

  static clearCart() {
    return api.post<{ ok: true }>("/cart/clear");
  }
}
