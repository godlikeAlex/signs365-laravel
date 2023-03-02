import api from "../api";
import { IGetProduct, IGetProductVariants } from "../types/axiosResponses";

export default class ProductService {
  static getProduct(slug: string) {
    return api.get<IGetProduct>(`/products/${slug}`);
  }

  static getProductVariants(slug: string) {
    return api.get<IGetProductVariants>(`/products/${slug}/variants`);
  }
}
