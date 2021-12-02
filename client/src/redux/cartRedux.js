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
    addProductToCart: (state, action) => {
      state.quantity = state.quantity + 1;
      state.products.push(action.payload);
      state.total =
        state.total +
        action.payload.price *
          action.payload.quantity;
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
  addProductToCart,
  getUserCartRequest,
  getUserCartSuccess,
  getUserCartFailure,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
