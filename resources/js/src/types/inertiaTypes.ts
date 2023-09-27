import { ICart, ICategoryWithProducts, User } from "./models";

export type SharedInertiaData = {
  homeCategories: ICategoryWithProducts[];
  cart: ICart;
  auth: {
    user?: User | null;
  };
};
