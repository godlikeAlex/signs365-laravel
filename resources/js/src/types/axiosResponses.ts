import {
  Domain,
  ICategoryWithProducts,
  IProductVaraint,
  User,
  IProduct,
  IOrder,
  ICategory,
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

export interface IGetProductVariants {
  variants: IProductVaraint[];
}

export interface IGetProduct {
  product: IProduct;
}

interface IPagenation {
  per_page: number;
  to: number;
  total: number;
  current_page: number;
  from: number;
  last_page: number;
}

export interface IOrdersPagenation {
  data: IOrder[];
  meta: IPagenation;
}

export interface IProductsPagenation {
  data: IProduct[];
  meta: IPagenation;
}
