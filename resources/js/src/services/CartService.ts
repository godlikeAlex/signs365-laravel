import api from "../api";
import { Addon, ProductOption } from "../types/ProductModel";
import { ICart } from "../types/models";

export interface UpdateCartParams {
  product_id: number;
  option_id: number;
  addons: Addon[];
  unit: "feet" | "inches";
  width: string | number;
  height: string | number;
  quantity: number;
  custom_size_id?: number;
  //
  city?: string;
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
    option_id: number,
    addons: Addon[],
    unit: "feet" | "inches",
    width: number | string,
    height: number | string,
    quantity: number
  ) {
    return api.post<{ price: string }>("/cart/calculate-single", {
      product_id: productID,
      option_id,
      addons,
      unit,
      width,
      height,
      quantity,
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
