import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
    
  },
  reducers: {
    getAllProductsRequest: (state) => {
      state.isFetching = true;
    },
    getAllProductsSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getAllProductsFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
    deleteProductRequest: (state) => {
      state.isFetching = true;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      //index - quantity delete
      state.products.splice(
        state.products.findIndex(
          (item) => item._id === action.payload,
        ),
        1,
      );
      alert("Delete product successfull");  },
    deleteProductFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
    updateProductRequest: (state) => {
      state.isFetching = true;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      alert("Update product successfull");
      state.products[
        state.products.findIndex(
          (item) =>
            item._id === action.payload.id,
        )
      ] = action.payload.updatedProduct;
    
    },
    updateProductFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
    addProductRequest: (state) => {
      state.isFetching = true;
  
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;

      state.products.push(action.payload);
      alert("Add new product successfull");
      
    },
    addProductFailure: (state) => {
      state.isFetching = true;
      state.error = true;
    },
  },
});

export const {
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  addProductRequest,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
