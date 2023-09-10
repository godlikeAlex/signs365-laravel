import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductService from "../services/ProductService";
import ProductAddons from "../components/ProductAddons/ProductAddons";
import { Addon, IProduct, ProductOption } from "../types/ProductModel";

export type AddonWithExtraFields = Addon & {
  extra_data_selected: { id: number; title: string }[];
};

interface IState {
  loading: boolean;
  selectedOption?: ProductOption;
  product?: IProduct;
  productSlug?: string;
  addons: AddonWithExtraFields[];
}

const initialState: IState = {
  loading: true,
  selectedOption: undefined,
  addons: [],
  product: undefined,
  productSlug: undefined,
};

export const getProduct = createAsyncThunk<
  IProduct,
  { slug: string },
  { rejectValue: any }
>("app/getSingleProduct", async function ({ slug }, { rejectWithValue }) {
  try {
    const { data } = await ProductService.getProduct(slug);

    return data.product;
  } catch (error) {
    return rejectWithValue("Error fetch product");
  }
});

const singleProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<IProduct>) {
      state.product = action.payload;

      if (action.payload.with_checkout) {
        const [firstOption] = action.payload.options;
        state.selectedOption = firstOption;

        state.addons = firstOption.addons.map((addon) => ({
          ...addon,
          isSelected: false,
          quantity: addon.withQuantity ? addon.validation["min-qty"] : 1,
          extra_data_selected: [],
        }));
      }

      state.loading = false;
    },

    selectProductOption(state, action: PayloadAction<ProductOption>) {
      state.selectedOption = action.payload;

      state.addons = action.payload.addons.map((addon) => ({
        ...addon,
        isSelected: false,
        quantity: addon.withQuantity ? addon.validation["min-qty"] : 1,
        extra_data_selected: [],
      }));
    },

    clearProductState(state) {
      state.selectedOption = undefined;
      state.loading = true;
      state.product = undefined;
      state.productSlug = undefined;
    },

    handleAddonChange(state, { payload }: PayloadAction<Addon>) {
      const currentAddon = state.addons.find(
        (addon) => addon.id === payload.id
      );

      if (currentAddon) {
        currentAddon.isSelected = !currentAddon.isSelected;
      }
    },

    updateAddonQuantity(
      state,
      { payload }: PayloadAction<{ quantity: number; addonID: number }>
    ) {
      const { quantity, addonID } = payload;

      const addon = state.addons.find((addon) => addon.id === addonID);

      if (addon && addon.withQuantity) {
        addon.quantity = quantity;
      }
    },

    selectExtraDataItems(
      state,
      {
        payload,
      }: PayloadAction<{
        targetExtraData: { id: number; title: string };
        addonID: number;
        isMultiSelect: boolean;
      }>
    ) {
      const { addonID, targetExtraData, isMultiSelect } = payload;
      const addon = state.addons.find((addon) => addon.id === addonID);

      if (!addon) {
        return;
      }

      const indexOfSelected = addon.extra_data_selected.findIndex(
        (extraData) => extraData.id === targetExtraData.id
      );

      if (indexOfSelected === -1) {
        if (isMultiSelect) {
          addon.extra_data_selected.push(targetExtraData);
        } else {
          const emptySelectedList = [];

          emptySelectedList.push(targetExtraData);

          addon.extra_data_selected = emptySelectedList;
        }
      } else {
        addon.extra_data_selected.splice(indexOfSelected, 1);
      }

      // const addon = state.addons.find((addon) => addon.id === addonID);
      // if (addon && addon.withQuantity) {
      //   addon.quantity = quantity;
      // }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;

      if (action.payload.with_checkout) {
        const [firstOption] = action.payload.options;
        state.selectedOption = firstOption;

        state.addons = firstOption.addons.map((addon) => ({
          ...addon,
          isSelected: false,
          quantity: addon.withQuantity ? addon.validation["min-qty"] : 1,
          extra_data_selected: [],
        }));
      }

      state.productSlug = action.payload.slug;
      state.loading = false;
    });
  },
});

export const {
  setProduct,
  clearProductState,
  selectProductOption,
  handleAddonChange,
  updateAddonQuantity,
  selectExtraDataItems,
} = singleProductSlice.actions;

export default singleProductSlice.reducer;
