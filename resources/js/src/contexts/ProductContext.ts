import React, { createContext } from "react";

export type ProductContextType = {
  selectedOption?: number;
  selectedAddons: Array<{ id: number; quantity: number }>;
  price?: number;
  unit: "inches" | "feet";
};

export interface ContextType {
  state: ProductContextType;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export const ProductContext = createContext<ContextType>({
  state: {
    selectedOption: undefined,
    selectedAddons: [],
    price: undefined,
    unit: "inches",
  },
  setState: () => {},
});
