import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  orderDate: null,
  totalPrice:0,
};

const cartSlice = createSlice({
  name: "userCart",
  initialState,
  reducers: {
    addItemInCart: (state, payload) => {
      const cartItemsIds = [];
      var cartItems = state.cartItems;
      cartItems.forEach((element) => {
        cartItemsIds.push(element.id);
      });
      if (cartItemsIds.indexOf(payload.payload.id) > -1) {
        cartItems = cartItems.filter((data) => data.id != payload.payload.id);
      }
      cartItems.push(payload.payload);
      state.cartItems = [];
      state.cartItems = cartItems;

      var cartItems = state.cartItems;
      var ItemPrices=0;
      cartItems.forEach((element) => {
        ItemPrices+=element.count * element.price;
      });
      state.totalPrice=ItemPrices;



    },
    setOrderDate: (state, action) => {
      state.orderDate = action.payload.orderDate;
    },
    removeItemInCart: (state, payload) => {
      const cartItemsIds = [];
      var cartItems = state.cartItems;
      cartItems.forEach((element) => {
        cartItemsIds.push(element.id);
      });
      if (cartItemsIds.indexOf(payload.payload.id) > -1) {
        cartItems = cartItems.filter((data) => data.id != payload.payload.id);
      }
      state.cartItems = cartItems;

      
      var cartItems = state.cartItems;
      var ItemPrices=0;
      cartItems.forEach((element) => {
        ItemPrices+=element.count * element.price;
      });
      state.totalPrice=ItemPrices;

    },
    updateItemCount: (state, payload) => {
      const cartItemsIds = [];
      var cartItems = state.cartItems;
      cartItems.forEach((element) => {
        cartItemsIds.push(element.id);
      });

      var orderObj = payload.payload;

      if (cartItemsIds.indexOf(orderObj.id) > -1) {
        var index = cartItemsIds.indexOf(orderObj.id);
        cartItems[index].count = orderObj.count;
        state.cartItems = cartItems;
      }

      
      var cartItems = state.cartItems;
      var ItemPrices=0;
      cartItems.forEach((element) => {
        ItemPrices+=element.count * element.price;
      });
      state.totalPrice=ItemPrices;
    },
    updateItemSliced: (state, payload) => {
      const cartItemsIds = [];
      var cartItems = state.cartItems;
      cartItems.forEach((element) => {
        cartItemsIds.push(element.id);
      });

      var orderObj = payload.payload;

      if (cartItemsIds.indexOf(orderObj.id) > -1) {
        var index = cartItemsIds.indexOf(orderObj.id);
        cartItems[index].sliceOption = orderObj.sliceOption;
        state.cartItems = cartItems;
        //console.warn(state.cartItems);
      }

      
      var cartItems = state.cartItems;
      var ItemPrices=0;
      cartItems.forEach((element) => {
        ItemPrices+=element.count * element.price;
      });
      state.totalPrice=ItemPrices;
    },

    updateItemNotes: (state, payload) => {
      const cartItemsIds = [];
      var cartItems = state.cartItems;
      cartItems.forEach((element) => {
        cartItemsIds.push(element.id);
      });

      var orderObj = payload.payload;

      if (cartItemsIds.indexOf(orderObj.id) > -1) {
        var index = cartItemsIds.indexOf(orderObj.id);
        cartItems[index].notes = orderObj.notes;
        state.cartItems = cartItems;
        //console.warn(state.cartItems);
      }
    },
    emptyCart: (state) => {
      state.orderDate = null;
      state.cartItems = [];
      state.totalPrice=0;
    },
    reorderCart(state, action) {
      state.cartItems = [];
      state.cartItems = action.payload;
    },
  },
});

export const {
  addItemInCart,
  removeItemInCart,
  updateItemCount,
  updateItemSliced,
  setOrderDate,
  emptyCart,
  reorderCart,
  updateItemNotes,
} = cartSlice.actions;

export const selectCart = (state) => state.userCart.cartItems;
export const selectItemsCount = (state) => state.userCart.cartItems.length;
export const selectOrderDate = (state) => state.userCart.orderDate;
export const selectTotalPrice = (state) => parseFloat(state.userCart.totalPrice).toFixed(2);


export default cartSlice.reducer;
