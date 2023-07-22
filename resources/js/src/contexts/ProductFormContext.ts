import React, { createContext } from "react";
import { ProductAddon, ProductOption } from "@/src/types/models";

type ErrorProductContext = {
  error: string;
  showError: boolean;
};

export type ProductFormContextType = {
  selectedOption?: ProductOption;
  selectedAddons: Array<ProductAddon & ErrorProductContext>;
  price?: number;
  unit: "inches" | "feet";
  disabled: boolean;
  quantity: number;
  width: {
    error: string;
    showError: boolean;
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
}

export const ProductFormContext = createContext<ContextType | undefined>(
  undefined
);
