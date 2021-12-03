import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    isFetching: false,
    error: false,
  },
  reducers: {
    addProductToCartRequest: (state, action) => {
      state.isFetching = true;
    },
    addProductToCart: (state, action) => {
      state.products.push(action.payload[0]);
      let total = 0;

      state.products.map((item, key) => {
        total =
          total + item.price * item.quantity;
        if (
          action.payload[0].productId ===
            item.productId &&
          action.payload[0].color ===
            item.color &&
          action.payload[0].size === item.size
        ) {
          state.quantity++;
        }
      });
      state.total = total;

      state.isFetching = false;
    },
    addProductToCartFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    getUserCartRequest: (state) => {
      state.isFetching = true;
    },
    getUserCartSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload.products;
      state.total = action.payload.total;
      state.quantity = action.payload.quantity;
    },
    getUserCartFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProductToCartRequest,
  addProductToCartSuccess,
  addProductToCartFailure,
  getUserCartRequest,
  getUserCartSuccess,
  getUserCartFailure,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
