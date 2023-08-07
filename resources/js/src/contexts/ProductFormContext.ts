import React, { createContext } from "react";
import { Addon, ProductOption } from "../types/ProductModel";

type ErrorProductContext = {
  error: string;
  showError: boolean;
};

export type ProductFormContextType = {
  selectedOption?: ProductOption;
  selectedAddons: Array<Addon & ErrorProductContext>;
  price?: number;
  calculatedPrice?: string;
  unit: "inches" | "feet";
  disabled: boolean;
  quantity: number;
  typeSizeSelection: "default" | "custom";
  highlightErrors: boolean;
  width: {
    error: string;
    showError: boolean;
    value: any;
  };
  customSize: {
    error: string;
    value: any;
  };
  height: {
    error: string;
    showError: boolean;
    value: any;
  };
};

export interface ContextType {
  state: ProductFormContextType;
  setState: React.Dispatch<React.SetStateAction<ProductFormContextType>>;
  validationRules: { [key: string]: boolean };
}

export const ProductFormContext = createContext<ContextType | undefined>(
  undefined
);
