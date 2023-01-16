import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartService } from "../services";
import { ICart } from "../types/models";

interface IState {
  cart?: ICart;
  loaded: boolean;
}

const initialState: IState = {
  cart: undefined,
  loaded: false,
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
  },
});

export default cartSlice.reducer;
