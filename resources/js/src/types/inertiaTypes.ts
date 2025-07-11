import { ICart, ICategoryWithProducts, User } from "./models";

export type SharedInertiaData = {
  homeCategories: ICategoryWithProducts[];
  currentCity: string;
  cart: ICart;
  auth: {
    user?: User | null;
  };
  ziggy: {
    url: string;
  };
};
