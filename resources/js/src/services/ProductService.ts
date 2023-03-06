import api from "../api";
import { IGetProduct, IGetProductVariants } from "../types/axiosResponses";

export default class ProductService {
  static getProduct(slug: string) {
    return api.get<IGetProduct>(`/products/${slug}`);
  }

  static getProductVariants(slug: string) {
    return api.get<IGetProductVariants>(`/products/${slug}/variants`);
  }

  static sendRequestProduct(
    slug: string,
    data: { name: string; email: string }
  ) {
    return api.post<{ ok: boolean }>(`/product-request/${slug}`, data);
  }
}
