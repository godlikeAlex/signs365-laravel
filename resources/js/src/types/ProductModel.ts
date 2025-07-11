import { ICategory } from "./models";

export type CustomSize = {
  id: number;
  width: string;
  height: string;
  label: string;
  product_option_id: number;
};

type ProductHasCustomSize = {
  show_custom_sizes: true;
  size_for_collect: true;
  customSizes: CustomSize[];
  common_data: undefined;
};

type ProductHasStaticSizes = {
  show_custom_sizes: false;
  size_for_collect: true;
  customSizes: CustomSize[];
  common_data: {
    static_width: string;
    static_height: string;
  };
};

type ProductSizesState = ProductHasCustomSize | ProductHasStaticSizes;

type ProductOptionTypeSQFT = {
  type: "sqft";
  show_custom_sizes: boolean;
  size_for_collect: false;
};

type ProductOptionTypeSingle = ProductSizesState & {
  type: "single";
};

type ProductOptionTypeQty = ProductSizesState & {
  type: "qty";
};

type ProductOptionType =
  | ProductOptionTypeSQFT
  | ProductOptionTypeSingle
  | ProductOptionTypeQty;

export interface IQuantityListItem {
  label: string;
  quantity: number;
}

export type ProductOption = ProductOptionType & {
  id: number;
  title: string;
  price: string;
  addons: Addon[];
  showCalculator: boolean;
  need_file: boolean;
  show_custom_sizes: boolean;
  prevent_user_input_size: boolean;
  quantity_list?: IQuantityListItem[];
  validation: {
    max_width: string;
    max_height: string;
  };
};

type ProudctAddonHasValidation =
  | { withQuantity: false }
  | {
      withQuantity: true;
      validation: { ["min-qty"]: number; ["max-qty"]: number };
    };

export type ExtraDataType = "unset" | "grommets" | "pole_pocket";

export type Addon = ProudctAddonHasValidation & {
  id: number;
  title: string;
  condition: string;
  isSelected: boolean;
  extra_data_type: ExtraDataType;
  group_addon?: string;
};

type ProductHasCheckout =
  | { with_checkout: false }
  | {
      with_checkout: true;
      options: ProductOption[];
      start_at: number;
    };

export type ProductImage = {
  id: number;
  path: string;
  alt?: null | string;
  thumbnail: string;
};

type IProductBase = {
  id: number;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  min_price: number;

  seo_title?: string;
  seo_desc?: string;
  seo_keywords?: string;

  faq?: { question: string; answer: string }[];

  images?: null | ProductImage[];
  categories?: Pick<ICategory, "title" | "slug" | "id">[];
};

export interface IProductCheckout extends IProductBase {
  with_checkout: true;
  options: ProductOption[];
  start_at: number;
}

export interface IProductDefault extends IProductBase {
  with_checkout: false;
}

export type IProduct = IProductDefault | IProductCheckout;
