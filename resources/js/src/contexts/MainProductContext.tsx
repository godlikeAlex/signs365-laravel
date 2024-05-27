import React, { createContext } from "react";
import {
  Action,
  ProductActions,
  ProductState,
} from "../reducers/ProductReducer";

export interface ContextType {
  state: ProductState;
  dispatch: React.Dispatch<Action>;
}

const MainProductContext = createContext<ContextType>(null);

export function useProductContext() {
  const context = React.useContext(MainProductContext);

  if (!context) {
    throw new Error(
      "useProductContext() cannot be used outside the <MainProductContext />"
    );
  }

  return context;
}

export default MainProductContext;
