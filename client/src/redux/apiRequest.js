import {
  loginFailure,
  loginRequest,
  loginSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  logoutRequest,
} from "./userRedux";
import { clearCart } from "./cartRedux";
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

export const getUserCart = async (
  dispatch,
  id,
) => {
  dispatch(loginRequest());
  try {
    const response = await userRequest.get(
      "/carts/getusercart",
      id,
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
