import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CartService } from "../services";
import {
  RemoveItemParams,
  UpdateCartParams,
  UpdateQuantityParams,
} from "../services/CartService";
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
  UpdateCartParams,
  { rejectValue: any }
>("cart/add", async (params, { rejectWithValue }) => {
  try {
    const { data } = await CartService.addToCart(params);

    return data;
  } catch (error) {
    return rejectWithValue("Failed add to cart");
  }
});

export const updateQuantity = createAsyncThunk<
  ICart,
  UpdateQuantityParams,
  { rejectValue: any }
>("cart/update-quantity", async (params, { rejectWithValue }) => {
  try {
    const { data } = await CartService.updateQuantity(params);

    return data;
  } catch (error) {
    return rejectWithValue("Failed add to cart");
  }
});

export const removeItemFromCart = createAsyncThunk<
  ICart,
  RemoveItemParams,
  { rejectValue: any }
>("cart/remove-item", async (params, { rejectWithValue }) => {
  try {
    const { data } = await CartService.removeItemFromCart(params);

    return data;
  } catch (error) {
    return rejectWithValue("Failed remove item from cart");
  }
});

export const clearCart = createAsyncThunk<
  { ok: true },
  void,
  { rejectValue: any }
>("cart/clear", async (_, { rejectWithValue }) => {
  try {
    const { data } = await CartService.clearCart();

    if (data.ok) {
      return data;
    } else {
      return rejectWithValue("Failed clear cart");
    }
  } catch (error) {
    return rejectWithValue("Failed remove item from cart");
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

    builder.addCase(updateQuantity.pending, (state, action) => {
      state.fetching = true;
    });

    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
    });

    builder.addCase(removeItemFromCart.pending, (state, action) => {
      state.fetching = true;
    });

    builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = action.payload;
    });

    builder.addCase(clearCart.pending, (state, action) => {
      state.fetching = true;
    });

    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.fetching = false;
      state.cart = {
        items: [],
        total: 0,
        tax: 0,
        total_with_tax: 0,
      };
    });
  },
});

export default cartSlice.reducer;
