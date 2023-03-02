import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoryService } from "../services";
import { ICategoryWithProducts } from "../types/models";

interface IState {
  homeCategories: ICategoryWithProducts[];
}

const initialState: IState = {
  homeCategories: [],
};

export const getCategoriesWithProducts = createAsyncThunk<
  ICategoryWithProducts[],
  void,
  { rejectValue: any }
>("app/homeCategories", async function (_, { rejectWithValue }) {
  try {
    const { data } = await CategoryService.getCategoriesWithProducts();

    return data.categories;
  } catch (error) {
    return rejectWithValue("Failed to get cart");
  }
});

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoriesWithProducts.fulfilled, (state, action) => {
      state.homeCategories = action.payload;
    });
  },
});

export default appSlice.reducer;
