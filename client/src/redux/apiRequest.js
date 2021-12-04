import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  logoutRequest,
} from "./userRedux";
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
  getUserCartRequest,
  getUserCartFailure,
  getUserCartSuccess,
  clearCart,
  incProduct,
} from "./cartRedux";
import {
  publicRequest,
  userRequest,
} from "../helper/requestMethods";
export const login = async (dispatch, user) => {
  dispatch(loginRequest());
  try {
    const response = await publicRequest.post(
      "/auth/login",
      user,
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const getCartItems = async (dispatch) => {
  dispatch(getUserCartRequest());
  try {
    const response = await userRequest.get(
      "/carts/getcartitems",
    );
    console.log(response.data.cartItems);
    dispatch(
      getUserCartSuccess(response.data.cartItems),
    );
  } catch (error) {
    console.log(error);
    dispatch(getUserCartFailure());
  }
};
export const register = async (
  dispatch,
  user,
) => {
  dispatch(registerRequest());
  try {
    const response = await publicRequest.post(
      "/auth/register",
      user,
    );

    dispatch(registerSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure());
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutRequest());
  dispatch(clearCart());
};

// export const getUserCart = async (
//   dispatch,
//   id,
// ) => {
//   dispatch(loginRequest());
//   try {
//     const response = await userRequest.get(
//       "/carts/getusercart",
//       id,
//     );
//     dispatch(loginSuccess(response.data));
//   } catch (error) {
//     dispatch(loginFailure());
//   }
// };

export const addToCart = async (
  dispatch,
  cartItems,
) => {
  dispatch(addProductToCartRequest());
  try {
    const response = await userRequest.post(
      "/carts/addtocart",
      { cartItems },
    );
    
      dispatch(
        addProductToCartSuccess(cartItems),
      );
      dispatch(
        getCartItems(dispatch),
      );
  } catch (error) {
   
  }
};


export const deleteCartItem = async (
  dispatch,
  cartItem,
) => {
  console.log(cartItem)
  try {
    const response = await userRequest.post(
      "/carts/removeitem",
      cartItem,
    );
    if (response.data.success) {
      dispatch(getCartItems(dispatch));
    }
  } catch (error) {
    console.log(error);
  }
};

export const changeQuantity = async (
  dispatch,
  data,
) => {
 
  try {
    const response = await userRequest.post(
      "/carts/changequantity",
      data,
    );
   
   if(response.data.success){
     dispatch(incProduct(data));
   }
  } catch (error) {
    console.log(error);
  }
};

export const deleteCart = async(dispatch)=>{
  try {
    const response = await userRequest.delete("/carts/delete")
    dispatch(clearCart())
  } catch (error) {
    console.log(error)
  }
}