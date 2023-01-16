export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Domain {
  id: number;
  domain: string;
}

export interface ICategory {
  id: number;
  title: string;
  slug: string;
}

export interface IProduct {
  id: number;
  title: string;
  slug: string;
  description: string;
  with_checkout: boolean;
  published: boolean;
  start_at: number;
  images?: null | string[];
}

export interface ICategoryWithProducts extends ICategory {
  products: IProduct[];
}

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  disabled: boolean;
  attributes: {
    product_variant_id: number;
  };
  associatedModel: IProduct;
}

export interface ICart {
  cart: ICartItem[];
  tax: number;
  total: number;
  total_with_tax: number;
}
