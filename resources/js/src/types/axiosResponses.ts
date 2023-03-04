import {
  Domain,
  ICategoryWithProducts,
  IProductVaraint,
  ProductVaraint,
  User,
  IProduct,
  IOrder,
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

export interface IGetProductVariants {
  variants: IProductVaraint[];
}

export interface IGetProduct {
  product: IProduct;
}

export interface IOrdersPagenation {
  data: IOrder[];
  meta: {
    per_page: number;
    to: number;
    total: number;
    current_page: number;
    from: number;
    last_page: number;
  };
}
