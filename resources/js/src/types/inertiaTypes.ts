import { CategoryWithProductCards, ICart, User } from "./models";

export type SharedInertiaData = {
  homeCategories: CategoryWithProductCards[];
  currentCity: string;
  cart: ICart;
  estimate_cart: ICart;
  auth: {
    user?: User | null;
  };
  ziggy: {
    url: string;
  };
};
