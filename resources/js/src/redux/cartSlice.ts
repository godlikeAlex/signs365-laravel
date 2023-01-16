import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartService } from "../services";
import { AddToCartParams } from "../services/CartService";
import { ICart } from "../types/models";

interface IState {
  cart?: ICart;
  loaded: boolean;
  fetching: boolean;
}

const initialState: IState = {
  cart: undefined,
  loaded: false,
  fetching: false,
};

export const initCart = createAsyncThunk<ICart, void, { rejectValue: any }>(
  "cart/init",
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await CartService.getCart();

      return data;
    } catch (error) {
      return rejectWithValue("Failed to get cart");
    }
  }
);

export const addToCart = createAsyncThunk<
  ICart,
  AddToCartParams,
  { rejectValue: any }
>("cart/add", async (params, { rejectWithValue }) => {
  try {
    const { data } = await CartService.addToCart(params);

    return data;
  } catch (error) {
    return rejectWithValue("Failed add to cart");
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initCart.pending, (state, action) => {
      state.loaded = false;
    });

    builder.addCase(initCart.fulfilled, (state, action) => {
      state.loaded = true;
      state.cart = action.payload;
    });

    builder.addCase(addToCart.pending, (state, action) => {
      state.fetching = true;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
    });
  },
});

export default cartSlice.reducer;
