import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import cartReducer from "./redux/cartSlice";
import appSliceReducer from "./redux/appSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    app: appSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
