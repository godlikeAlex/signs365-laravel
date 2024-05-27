import { Addon, IProduct, ProductOption } from "../types/ProductModel";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ProductActions =
  ActionMap<ProductPayload>[keyof ActionMap<ProductPayload>];

export enum ProductActionKind {
  INIT_PRODUCT = "INIT_PRODUCT",
  SELECT_OPTION = "SELECT_OPTION",
  START_FETCHING = "START_FETCHING",
  UPDATE_PRICE = "UPDATE_PRICE",
  SELECT_ADDON = "SELECT_ADDON",
  REMOVE_ADDON = "REMOVE_ADDON",
  CHANGE_ADDON_QUANTITY = "CHANGE_ADDON_QUANTITY",
  SET_ERROR_TO_ADDON = "SET_ERROR_TO_ADDON",
  SELECT_EXTRA_ITEM_IN_ADDON = "SELECT_EXTRA_ITEM_IN_ADDON",
  UPDATE_QUANTITY_OF_PRODUCT = "UPDATE_QUANTITY_OF_PRODUCT",
}

type AddProductAction = {
  type: ProductActionKind.INIT_PRODUCT;
  payload: IProduct;
};

type SelectOptionAction = {
  type: ProductActionKind.SELECT_OPTION;
  payload: ProductOption;
};

type StartFetchingAction = {
  type: ProductActionKind.START_FETCHING;
  payload?: ProductOption;
};

type SetPriceAction = {
  type: ProductActionKind.UPDATE_PRICE;
  payload: string;
};

type SelectAddonAction = {
  type: ProductActionKind.SELECT_ADDON;
  payload: { addon: Addon };
};

type RemoveAddonAction = {
  type: ProductActionKind.REMOVE_ADDON;
  payload: { id: any };
};

type ChangeAddonQuantityAction = {
  type: ProductActionKind.CHANGE_ADDON_QUANTITY;
  payload: { selectedAddonID: number; quantity: number };
};

type SetErrorToAddonAction = {
  type: ProductActionKind.SET_ERROR_TO_ADDON;
  payload: { selectedAddonID: number; error?: string };
};

type SelectExtraDataItemsAction = {
  type: ProductActionKind.SELECT_EXTRA_ITEM_IN_ADDON;
  payload: {
    addonID: number;
    targetExtraData: { id: number; title: string };
    isMultiSelect: boolean;
  };
};

type UpdateQuantityOfProductAction = {
  type: ProductActionKind.UPDATE_QUANTITY_OF_PRODUCT;
  payload: {
    quantity: number;
  };
};

export type Action =
  | AddProductAction
  | SelectOptionAction
  | StartFetchingAction
  | SetPriceAction
  | SelectAddonAction
  | RemoveAddonAction
  | ChangeAddonQuantityAction
  | SetErrorToAddonAction
  | SelectExtraDataItemsAction
  | UpdateQuantityOfProductAction;

type ProductPayload = {
  [ProductActionKind.INIT_PRODUCT]: {
    product: IProduct;
  };
};

interface IdleProduct {
  product?: undefined;
  status: "idle" | "fetching" | "ready";
}

interface LoadedProduct {
  product: IProduct;
  status: "loaded" | "fetching" | "ready";
}

export type SelectedAddon = Addon & {
  quantity: number;
  error?: any;
  extra_data_selected: { id: number; title: string }[];
};

export type ProductState = {
  selectedOption?: ProductOption;
  selectedAddons: SelectedAddon[];
  price?: string;
  unit: "inches" | "feet";
  width?: number;
  height?: number;
  quantity?: number;
  calculatedPrice?: string;
} & (IdleProduct | LoadedProduct);

function ProductReducer(state: ProductState, action: Action): ProductState {
  const { type, payload } = action;

  switch (type) {
    case ProductActionKind.INIT_PRODUCT:
      let selectedOption = undefined;

      if (payload.with_checkout) {
        const [firstOption] = payload.options;

        selectedOption = firstOption;
      }

      return {
        product: payload,
        selectedOption,
        selectedAddons: [],

        status: "loaded",
        price: undefined,

        unit: "inches",
        width: 1,
        height: 1,
        quantity: 1,
        calculatedPrice: undefined,
      };
    case ProductActionKind.SELECT_OPTION:
      return {
        ...state,
        selectedOption: payload,
        selectedAddons: [],
      };
    case ProductActionKind.START_FETCHING:
      return { ...state, status: "fetching" };
    case ProductActionKind.UPDATE_PRICE:
      return {
        ...state,
        price: payload,
        calculatedPrice: payload,
        status: "ready",
      };
    case ProductActionKind.SELECT_ADDON:
      const newSelectedAddon = {
        ...payload.addon,
        quantity: 1,
        error: undefined,
        extra_data_selected: [],
      };

      return {
        ...state,
        selectedAddons: [...state.selectedAddons, newSelectedAddon],
      };
    case ProductActionKind.REMOVE_ADDON:
      return {
        ...state,
        selectedAddons: state.selectedAddons.filter(
          (addon) => addon.id !== payload.id
        ),
      };
    case ProductActionKind.CHANGE_ADDON_QUANTITY:
      return {
        ...state,
        selectedAddons: state.selectedAddons.map((selectedAddon) => {
          if (selectedAddon.id === payload.selectedAddonID) {
            if (!selectedAddon.withQuantity) {
              return selectedAddon;
            }

            const maxQTY = selectedAddon.validation["max-qty"];
            const minQTY = selectedAddon.validation["min-qty"];

            let error;

            if (payload.quantity > maxQTY) {
              error = `The maximum quantity must be ${maxQTY}.`;
            } else if (payload.quantity < minQTY) {
              error = `The minimum quantity must be ${minQTY}.`;
            } else {
              error = undefined;
            }

            return {
              ...selectedAddon,
              quantity: payload.quantity,
              error: error,
            };
          }

          return selectedAddon;
        }),
      };
    case ProductActionKind.SET_ERROR_TO_ADDON:
      return {
        ...state,
        selectedAddons: state.selectedAddons.map((selectedAddon) => {
          if (selectedAddon.id === payload.selectedAddonID) {
            return {
              ...selectedAddon,
              error: payload.error,
            };
          }

          return selectedAddon;
        }),
      };
    case ProductActionKind.SELECT_EXTRA_ITEM_IN_ADDON:
      const { addonID, isMultiSelect, targetExtraData } = payload;

      const addon = state.selectedAddons.find((addon) => addon.id === addonID);
      let extraDataSelected = [...addon.extra_data_selected];

      if (!addon) {
        return;
      }

      const indexOfSelected = extraDataSelected.findIndex(
        (extraData) => extraData.id === targetExtraData.id
      );

      if (indexOfSelected === -1) {
        if (isMultiSelect) {
          extraDataSelected.push(targetExtraData);
        } else {
          const emptySelectedList = [];

          emptySelectedList.push(targetExtraData);

          extraDataSelected = emptySelectedList;
        }
      } else {
        extraDataSelected = extraDataSelected.splice(indexOfSelected, 1);
      }

      return {
        ...state,
        selectedAddons: state.selectedAddons.map((selectedAddon) => {
          if (selectedAddon.id === addonID) {
            return {
              ...selectedAddon,
              extra_data_selected: extraDataSelected,
            };
          }

          return selectedAddon;
        }),
      };
    case ProductActionKind.UPDATE_QUANTITY_OF_PRODUCT:
      return { ...state, quantity: payload.quantity };
    default:
      throw new Error(`Unhandled actionType: ${type}`);
  }
}

export default ProductReducer;
