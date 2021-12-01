import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getAllOrdersRequest: (state) => {
      state.isFetching = true;
    },
    getAllOrdersSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getAllOrdersFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
  },
});

export const {
  getAllOrdersRequest,
  getAllOrdersSuccess,
  getAllOrdersFailure,
} = orderSlice.actions;
export default orderSlice.reducer;
