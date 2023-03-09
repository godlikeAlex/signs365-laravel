import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProductService from "../services/ProductService";
import { IProduct, IProductVaraint } from "../types/models";

interface IState {
  loading: boolean;
  productVaraintsLoaded: boolean;
  productVariants?: IProductVaraint[];
  currentVaraint?: IProductVaraint;
  product?: IProduct;
  productSlug?: string;
}

const initialState: IState = {
  loading: true,
  productVariants: undefined,
  productVaraintsLoaded: false,
  currentVaraint: undefined,
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

export const getProductVariants = createAsyncThunk<
  IProductVaraint[],
  { slug: string },
  { rejectValue: any }
>("app/getVariantsForProduct", async function ({ slug }, { rejectWithValue }) {
  try {
    const { data } = await ProductService.getProductVariants(slug);

    return data.variants;
  } catch (error) {
    return rejectWithValue("Error fetch product variants");
  }
});

const singleProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<IProduct>) {
      state.product = action.payload;
    },
    selectProductVariant(state, action: PayloadAction<IProductVaraint>) {
      state.currentVaraint = action.payload;
    },
    clearProductState(state) {
      state.currentVaraint = undefined;
      state.loading = false;
      state.product = undefined;
      state.productSlug = undefined;
      state.productVaraintsLoaded = false;
      state.productVariants = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.productSlug = action.payload.slug;
      state.loading = false;
    });

    builder.addCase(getProductVariants.fulfilled, (state, action) => {
      state.productVaraintsLoaded = true;
      state.productVariants = action.payload;
      state.currentVaraint = action.payload[0];
    });
  },
});

export const { setProduct, selectProductVariant, clearProductState } =
  singleProductSlice.actions;

export default singleProductSlice.reducer;
