import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import snackBarSlice from "./slices/snackBarSlice";
import dataSlice from "./slices/dataSlice";

export const store = configureStore({
  reducer: {
    userAuth: authSlice,
    userCart: cartSlice,
    snackSlice: snackBarSlice,
    data: dataSlice,
  },
});
