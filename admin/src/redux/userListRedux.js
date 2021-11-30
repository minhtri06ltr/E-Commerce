import { createSlice } from "@reduxjs/toolkit";

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getAllUsersRequest: (state) => {
      state.isFetching = true;
    },
    getAllUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getAllUsersFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
    // deleteProductRequest: (state) => {
    //   state.isFetching = true;
    // },
    // deleteProductSuccess: (state, action) => {
    //   state.isFetching = false;
    //   //index - quantity delete
    //   state.products.splice(
    //     state.products.findIndex(
    //       (item) => item._id === action.payload,
    //     ),
    //     1,
    //   );
    // },
    // deleteProductFailure: (state) => {
    //   state.isFetching = true;
    //   state.error = true;
    // },
    // updateProductRequest: (state) => {
    //   state.isFetching = true;
    // },
    // updateProductSuccess: (state, action) => {
    //   state.isFetching = false;

    //   state.products[
    //     state.products.findIndex(
    //       (item) =>
    //         item._id === action.payload.id,
    //     )
    //   ] = action.payload.product;
    // },
    // updateProductFailure: (state) => {
    //   state.isFetching = true;
    //   state.error = true;
    // },
    // addProductRequest: (state) => {
    //   state.isFetching = true;
    // },
    // addProductSuccess: (state, action) => {
    //   state.isFetching = false;

    //   state.products.push(action.payload);
    // },
    // addProductFailure: (state) => {
    //   state.isFetching = true;
    //   state.error = true;
    // },
  },
});

export const {
  getAllUsersRequest,
  getAllUsersSuccess,
  getAllUsersFailure,
} = userListSlice.actions;
export default userListSlice.reducer;
