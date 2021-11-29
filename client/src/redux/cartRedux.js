import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
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
  },
});

export const { addProductToCart } =
  cartSlice.actions;
export default cartSlice.reducer;
