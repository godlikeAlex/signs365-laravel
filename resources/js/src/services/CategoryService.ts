import api from "../api";
import { ICategoriesWithProducts } from "../types/axiosResponses";

export default class CategoryService {
  static getCategoriesWithProducts() {
    return api.get<ICategoriesWithProducts>("/categories");
  }
}
