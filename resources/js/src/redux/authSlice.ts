import { compose, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import axiosErrorGrab from "../helpers/axiosErrorGrabber";
import CrosDomainStorage from "../helpers/crossDomainStorage";
import { AuthService } from "../services";
import { LoginResponse } from "../types/axiosResponses";
import { ErrorFromAxios } from "../types/common";
import { User } from "../types/models";

interface IAuthState {
  authChecked: boolean;
  isAuthed: boolean;
  user?: User;
}

const initialState: IAuthState = {
  authChecked: false,
  isAuthed: false,
  user: undefined,
};

export const login = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: ErrorFromAxios }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await AuthService.login(email, password);

    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorGrab(error));
  }
});

export const getUserByToken = createAsyncThunk<
  User,
  void,
  { rejectValue: ErrorFromAxios }
>("auth/user", async (_, { rejectWithValue }) => {
  try {
    const response = await AuthService.getUser();

    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorGrab(error));
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.authChecked = true;
      state.isAuthed = true;
      state.user = action.payload.user;
    });

    builder.addCase(getUserByToken.fulfilled, (state, action) => {
      state.authChecked = true;
      state.isAuthed = true;
      state.user = action.payload;
    });

    builder.addCase(getUserByToken.rejected, (state) => {
      state.authChecked = true;
      state.isAuthed = false;
      state.user = undefined;
    });
  },
});

export default authSlice.reducer;
