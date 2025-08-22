import { IProduct, ProductImage } from "./ProductModel";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  provider_name?: string;
}

export interface Domain {
  id: number;
  domain: string;
}

export interface IOrder {
  id: number;
  uuid: string;
  status: string;
  amount: number;
  tax: number;
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
  images: string[];
}

export interface ICategory {
  id: number;
  title: string;
  slug: string;
  icon?: string;
  active_icon?: string;
  colors: {
    primary: string;
    alternative: string;
  };
  show_on_home?: null | boolean;
}

export interface IProductCard {
  id: number;
  title: string;
  slug: string;
  rating: number;
  short_description: string;
  min_price: number;
  categories?: Pick<ICategory, "title" | "slug" | "id" | "colors">[];
  images?: null | ProductImage[];
}

export interface ICategoryWithProducts extends ICategory {
  products: IProduct[];
}

export interface CategoryWithProductCards extends ICategory {
  products: IProductCard[];
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
      slug: string;
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

export interface IMediaReview {
  id: number;
  file_path: string;
  file_type: "video" | "image";
}

export interface IReview {
  id: number;
  rating: number;
  review: string;
  user: { name: string; avatar?: string };
  media: IMediaReview[];
  date: string;
}
