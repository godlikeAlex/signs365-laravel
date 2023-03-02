import {
  Domain,
  ICategoryWithProducts,
  IProductVaraint,
  ProductVaraint,
  User,
  IProduct,
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
