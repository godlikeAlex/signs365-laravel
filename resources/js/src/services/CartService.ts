import api from "../api";
import { ICart, ProductAddon, ProductOption } from "../types/models";

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

  static calculateSinglePrice(
    productID: number,
    option: ProductOption,
    addons: ProductAddon[],
    unit: "feet" | "inches",
    width: number | string,
    height: number | string
  ) {
    return api.post<{ price: number }>("/cart/calculate-single", {
      product_id: productID,
      option,
      addons,
      unit,
      width,
      height,
    });
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
