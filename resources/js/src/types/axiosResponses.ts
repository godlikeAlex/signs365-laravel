import { IProduct } from "./ProductModel";
import {
  Domain,
  ICategoryWithProducts,
  User,
  IOrder,
  ICategory,
  IProductCard,
  IReview,
} from "./models";

export interface LoginResponse {
  token: string;
  user: User;
}

export interface DomainsResponse {
  data: Domain[];
}

export interface ICategoriesWithProducts {
  categories: ICategoryWithProducts[];
}

export interface IGetCategory {
  category: ICategory;
  count_products: number;
}

// export interface IGetProductVariants {
// variants: IProductVaraint[];
// }

export interface IGetProduct {
  product: IProduct;
}

interface IPagination {
  per_page: number;
  to: number;
  total: number;
  current_page: number;
  from: number;
  last_page: number;
}

export interface IOrdersPagenation {
  data: IOrder[];
  meta: IPagination;
}

export interface IProductsPagination {
  data: IProductCard[];
  meta: IPagination;
}

export interface IReviewsPaginationResponse {
  data: IReview[];
  meta: IPagination;
}
