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

export type ProductOption = {
  id: number;
  title: string;
  price: string;
};

type ProudctAddonHasValidation =
  | { withQuantity: false }
  | {
      withQuantity: true;
      validation: { ["min-qty"]: number; ["max-qty"]: number };
      quantity: number;
    };

export type ProductAddon = ProudctAddonHasValidation & {
  id: number;
  title: string;
  condition: string;
  isSelected: boolean;
};

type ProductHasCheckout =
  | { with_checkout: false }
  | {
      with_checkout: true;
      sizes: { title: string }[];
      options: ProductOption[];
      addons: ProductAddon[];
    };

export type IProduct = ProductHasCheckout & {
  id: number;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  start_at: number;

  images?: null | string[];
  categories?: Pick<ICategory, "title" | "slug" | "id">[];
};

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
    product_variant: {
      id: number;
      label: string;
    };
  };
  associatedModel: IProduct;
}

export interface ICart {
  items: ICartItem[];
  tax: number;
  total: number;
  total_with_tax: number;
}

export interface IProductVaraint {
  id: number;
  label: string;
  price: number;
}
