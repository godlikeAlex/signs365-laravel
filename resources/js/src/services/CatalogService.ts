import api from "../api";
import { IGetCategory, IProductsPagenation } from "../types/axiosResponses";
import { ICategory } from "../types/models";

export default class CatalogService {
  static getCategory(slug: string) {
    return api.get<IGetCategory>(`/shop/category/${slug}`);
  }

  static categories() {
    return api.get<{ categories: ICategory[] }>(`/shop/categories`);
  }

  static products(categorySlug, page: number | string = 1) {
    return api.get<IProductsPagenation>(
      `/shop/category/${categorySlug}/products?page=${page}`
    );
  }
}
