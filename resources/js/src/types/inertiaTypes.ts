import { CategoryWithProductCards, ICart, User } from "./models";

export type SharedInertiaData = {
  homeCategories: CategoryWithProductCards[];
  currentCity: string;
  cart: ICart;
  auth: {
    user?: User | null;
  };
  ziggy: {
    url: string;
  };
};
