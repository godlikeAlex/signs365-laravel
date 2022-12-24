import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "../services";

const initialState = {
  authChecked: false,
  isAuthed: false,
  user: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      console.log(email, password);
      // const response = AuthService.login();
      return "";
    } catch (error) {}
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.authChecked = true;
      state.isAuthed = true;
    });
  },
});

export default authSlice.reducer;
