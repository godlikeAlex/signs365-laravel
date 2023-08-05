import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductService from "../services/ProductService";
import ProductAddons from "../components/ProductAddons/ProductAddons";
import { Addon, IProduct, ProductOption } from "../types/ProductModel";

interface IState {
  loading: boolean;
  selectedOption?: ProductOption;
  product?: IProduct;
  productSlug?: string;
  addons: Addon[];
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
      }));
    },

    clearProductState(state) {
      state.selectedOption = undefined;
      state.loading = false;
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
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;

      if (action.payload.with_checkout) {
        const [firstOption] = action.payload.options;
        state.selectedOption = firstOption;
        console.log(firstOption.addons, "singleProductSlice");
        state.addons = firstOption.addons.map((addon) => ({
          ...addon,
          isSelected: false,
          quantity: addon.withQuantity ? addon.validation["min-qty"] : 1,
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
} = singleProductSlice.actions;

export default singleProductSlice.reducer;
