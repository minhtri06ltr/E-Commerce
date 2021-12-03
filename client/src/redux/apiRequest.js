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
    if (response.data.success)
      dispatch(
        addProductToCartRequest(cartItems),
      );
  } catch (error) {
    console.log(error);
    dispatch(addProductToCartFailure());
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

export const deleteCartItem = async (
  dispatch,
  cartItem,
) => {
  try {
    const response = await userRequest.delete(
      "/carts/removeitem",
      cartItem,
    );
    if (response.data.success) {
      dispatch(getCartItems());
    }
  } catch (error) {
    console.log(error);
  }
};
