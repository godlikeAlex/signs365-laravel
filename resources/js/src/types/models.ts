import { IProduct } from "./ProductModel";

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

export interface IOrder {
  id: number;
  uuid: string;
  status: string;
  total: number;
  total_without_tax: number;
  address: string;
  created_at: string;
  order_items: IOrderItem[];
}

export interface IOrderItem {
  id: number;
  quantity: number;
  price: number;
  product_variant_title: string;
  product: IProduct;
}

export interface ICategory {
  id: number;
  title: string;
  slug: string;
  icon?: string;
  show_on_home?: null | boolean;
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
    productOptionType: string;
    width?: string;
    height?: string;
    unit?: string;
    productOption: {
      id: number;
      title: string;
    };
    product: {
      id: number;
      title: string;
    };
    customSize?: {
      id: number;
      title: string;
    };
  };
  associatedModel: IProduct;
}

export interface IVoucher {
  discountAmount: number;
  id: number;
  name: string;
  value: string;
}

export interface ICart {
  items: ICartItem[];
  tax: number;
  total: number;
  voucher?: IVoucher;
  discount_voucher?: number;
  total_with_tax: number;
}

export interface IProductVaraint {
  id: number;
  label: string;
  price: number;
}
