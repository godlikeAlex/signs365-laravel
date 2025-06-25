import api from "../api";
import { FileState } from "../components/Dropzone/Dropzone";
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
  size_id?: number;
  files?: FileState[];
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
    quantity: number,
    size_id?: number
  ) {
    return api.post<{ price: string }>("/cart/calculate-single", {
      product_id: productID,
      option_id,
      addons,
      unit,
      width,
      height,
      quantity,
      size_id,
    });
  }

  static calculatePrice(body: {
    productID: number;
    option_id: number;
    addons: Addon[];
    unit: "feet" | "inches";
    width: number | string;
    height: number | string;
    quantity: number;
    size_id?: number;
  }) {
    return api.post<{ price: string }>("/cart/calculate-single", {
      ...body,
      product_id: body.productID,
    });
  }

  static addToCart(body: UpdateCartParams) {
    const formData = new FormData();

    console.log(body);

    for (const [key, value] of Object.entries(body)) {
      if (!value) continue;

      if (key === "addons") {
        for (let i = 0; i < value.length; i++) {
          for (let keyOfAddon of Object.keys(value[i])) {
            const field = value[i][keyOfAddon];
            formData.append(
              `addons[${i}][${keyOfAddon}]`,
              field instanceof Array ? JSON.stringify(field) : field
            );
          }
        }

        continue;
      }

      if (key === "files") {
        value.forEach((item) => formData.append(`files[]`, item));

        continue;
      }

      formData.append(key, value);
    }

    return api.post<ICart>("/cart/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
