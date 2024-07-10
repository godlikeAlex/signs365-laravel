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
  CHANGE_UNIT = "CHANGE_UNIT",
  UPDATE_INPUT = "UPDATE_INPUT",
  SET_CUSTOM_SIZE = "SET_CUSTOM_SIZE",
  STOP_FETCHING = "STOP_FETCHING",
  SET_CUSTOM_SIZE_ERROR = "SET_CUSTOM_SIZE_ERROR",
  SET_SIZE_SELECTION_TYPE = "SET_SIZE_SELECTION_TYPE",
  INIT_SIZES = "INIT_SIZES",
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

type ChangeUnitAction = {
  type: ProductActionKind.CHANGE_UNIT;
  payload: {
    unit: "feet" | "inches";
  };
};

type UpdateInputAction = {
  type: ProductActionKind.UPDATE_INPUT;
  payload: {
    input: "width" | "height";
    value: number;
  };
};

type UpdateCustomSizeAction = {
  type: ProductActionKind.SET_CUSTOM_SIZE;
  payload: {
    width: number;
    height: number;
    customSize: number;
  };
};

type StopFetchingAction = {
  type: ProductActionKind.STOP_FETCHING;
  payload?: undefined;
};

type SetErrorToFieldAction = {
  type: ProductActionKind.SET_CUSTOM_SIZE_ERROR;
  payload: {
    field: "width" | "height" | "customSize";
    showError?: boolean;
    error?: string | null;
  };
};

type SetSizeSelectionType = {
  type: ProductActionKind.SET_SIZE_SELECTION_TYPE;
  payload: { type: "default" | "custom" };
};

type InitSizeType = {
  type: ProductActionKind.INIT_SIZES;
  payload: { width: number; height: number };
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
  | UpdateQuantityOfProductAction
  | ChangeUnitAction
  | UpdateInputAction
  | UpdateCustomSizeAction
  | StopFetchingAction
  | SetErrorToFieldAction
  | SetSizeSelectionType
  | InitSizeType;

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
  sizeSelectionType: "default" | "custom";
  width?: {
    value: number;
    error?: string | null;
    showError: boolean;
    initiated: boolean;
  };
  height?: {
    value: number;
    error?: string | null;
    showError: boolean;
    initiated: boolean;
  };
  customSize?: {
    value: number;
    error?: string | null;
    showError: boolean;
  };
  quantity?: {
    value: number;
    error?: string | null;
    showError: boolean;
  };
  calculatedPrice?: string;
} & (IdleProduct | LoadedProduct);

function ProductReducer(state: ProductState, action: Action): ProductState {
  const { type, payload } = action;

  switch (type) {
    case ProductActionKind.INIT_PRODUCT:
      let selectedOption = undefined;
      let quantity = 1;
      let width = {
        error: undefined,
        value: 1,
        showError: false,
        initiated: true,
      };
      let height = {
        error: undefined,
        value: 1,
        showError: false,
        initiated: true,
      };

      if (payload.with_checkout) {
        const [firstOption] = payload.options;

        quantity =
          firstOption.quantity_list && firstOption.quantity_list.length > 0
            ? firstOption.quantity_list[0].quantity
            : 1;

        selectedOption = {
          ...firstOption,
          quantity_list:
            firstOption.quantity_list && firstOption.quantity_list.length > 0
              ? firstOption.quantity_list
              : undefined,
        };

        if (!firstOption.show_custom_sizes && firstOption.size_for_collect) {
          width = {
            error: undefined,
            value: +firstOption.common_data.static_width,
            showError: false,
            initiated: true,
          };

          height = {
            error: undefined,
            value: +firstOption.common_data.static_height,
            showError: false,
            initiated: true,
          };
        }
      }

      return {
        product: payload,
        selectedOption,
        selectedAddons: [],

        status: "loaded",
        price: undefined,

        unit: "inches",
        sizeSelectionType: selectedOption?.prevent_user_input_size
          ? "default"
          : "custom",
        width,
        height,
        customSize: { error: undefined, value: undefined, showError: false },
        quantity: { error: undefined, value: quantity, showError: false },
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
    case ProductActionKind.STOP_FETCHING:
      return { ...state, status: "ready" };
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

      const selectedAddons = [...state.selectedAddons].filter(
        (selectedAddon) => {
          if (
            newSelectedAddon.group_addon &&
            newSelectedAddon.group_addon !== "addons"
          ) {
            const sameGroup =
              newSelectedAddon.group_addon === selectedAddon?.group_addon;

            return sameGroup ? false : true;
          }

          return true;
        }
      );

      return {
        ...state,
        selectedAddons: [...selectedAddons, newSelectedAddon],
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
        let copySelectedExtraData = [...extraDataSelected];

        copySelectedExtraData.splice(indexOfSelected, 1);

        extraDataSelected = copySelectedExtraData;
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
      return {
        ...state,
        quantity: {
          value: payload.quantity,
          error: undefined,
          showError: false,
        },
      };
    case ProductActionKind.CHANGE_UNIT:
      return { ...state, unit: payload.unit };
    case ProductActionKind.UPDATE_INPUT:
      return {
        ...state,
        [payload.input]: {
          error: undefined,
          value: payload.value,
          initiated: true,
        },
      };
    case ProductActionKind.SET_CUSTOM_SIZE:
      return {
        ...state,
        width: {
          error: undefined,
          value: payload.width,
          showError: false,
          initiated: false,
        },
        height: {
          error: undefined,
          value: payload.height,
          showError: false,
          initiated: false,
        },
        customSize: {
          error: undefined,
          value: payload.customSize,
          showError: false,
        },
      };
    case ProductActionKind.SET_CUSTOM_SIZE_ERROR:
      return {
        ...state,
        [payload.field]: {
          ...state[payload.field],
          error: payload.error,
          showError:
            payload.showError === undefined
              ? state[payload.field].showError
              : payload.showError,
        },
      };
    case ProductActionKind.SET_SIZE_SELECTION_TYPE:
      return {
        ...state,
        sizeSelectionType: payload.type,
      };
    case ProductActionKind.INIT_SIZES:
      return {
        ...state,
        width: {
          ...state.width,
          initiated: true,
          value: payload.width,
        },
        height: {
          ...state.height,
          initiated: true,
          value: payload.height,
        },
      };
    default:
      throw new Error(`Unhandled actionType: ${type}`);
  }
}

export default ProductReducer;
