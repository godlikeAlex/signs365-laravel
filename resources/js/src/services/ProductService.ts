import api from "../api";
import { IGetProductVariants } from "../types/axiosResponses";

export default class ProductService {
  static getProductVariants(productID: number) {
    return api.get<IGetProductVariants>(`/products/${productID}/variants`);
  }
}
