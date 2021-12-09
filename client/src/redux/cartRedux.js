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
    addProductToCartSuccess: (state, action) => {
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
      console.log(action.payload);
      state.isFetching = false;
      state.products = action.payload;
      let total = 0
      state.products.map(item=>{
        total = total +  item.quantity*item.price;
        console.log("quantity",item.quantity,"price",item.price)
      })
      state.total = total;
      state.quantity = state.products.length
    },
    getUserCartFailure: (state) => {
      state.error = true;
      state.isFetching = false;
    },
    incProduct:(state,action)=>{
      console.log(action.payload);
      let price  
      state.products.map(item=>{
        if(item.color === action.payload.color &&item.size ===action.payload.size && item._id === action.payload.productId){
          item.quantity =  item.quantity + action.payload.value
         if(action.payload.value === 1 )
         {
           price = item.price;
         }else{
           price = - item.price
         }
        }
      })
      state.total = state.total + price
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
  incProduct,
  
  getUserCartRequest,
  getUserCartSuccess,
  getUserCartFailure,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
