import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  offerings: [],
  products: [],
  promotion: {},
  min_order_price: 0,
  delivery_charges: 0,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    loadData: (state, action) => {
      var ids = [];
      const offerings = action.payload.offerings;
      state.products = action.payload.products;
      state.promotion = action.payload.promotion;
      state.min_order_price = action.payload.min_order_price;
      state.delivery_charges = action.payload.delivery_charges;

      offerings.forEach((element) => {
        ids.push(element);
      });
      ///console.warn(ids);
      state.offerings = ids;
    },
    loadPormotion: (state, action) => {
      state.promotion = action.payload.promotion;
      console.warn(state.promotion);
    },
    setMinOrderPrice: (state, action) => {
      state.min_order_price = action.payload;
    },
    setProductFav:(state, action) => {
      state.products = Object.assign([], action.payload)
    }
  },
});

export const { loadData, loadPormotion, setMinOrderPrice, setProductFav } = dataSlice.actions;

export const selectOfferings = (state) => state.data.offerings;
export const selectProducts = (state) => state.data.products;
export const selectPromotion = (state) => state.data.promotion;
export const selectMinOrderPrice = (state) => state.data.min_order_price;
export const selectDeliveryCharges = (state) => state.data.delivery_charges;

// export const selectItemsCount = (state) => state.userCart.cartItems.length;
// export const selectOrderDate = (state) => state.userCart.orderDate;

export default dataSlice.reducer;
