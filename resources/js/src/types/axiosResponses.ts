import {
  Domain,
  ICategoryWithProducts,
  IProductVaraint,
  ProductVaraint,
  User,
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
