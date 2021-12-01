import {
  loginFailure,
  loginRequest,
  loginSuccess,
} from "./userRedux";
import {
  publicRequest,
  userRequest,
} from "../helper/requestMethods";
import {
  addProductFailure,
  addProductRequest,
  addProductSuccess,
  deleteProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  getAllProductsFailure,
  getAllProductsRequest,
  getAllProductsSuccess,
  updateProductFailure,
  updateProductRequest,
  updateProductSuccess,
} from "./productRedux";
import {
  addUserFailure,
  addUserRequest,
  addUserSuccess,
  getAllUsersRequest,
  getAllUsersSuccess,
} from "./userListRedux";
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

export const getAllProducts = async (
  dispatch,
) => {
  dispatch(getAllProductsRequest());
  try {
    const response = await publicRequest.get(
      "/products",
    );
    dispatch(
      getAllProductsSuccess(
        response.data.products,
      ),
    );
  } catch (error) {
    dispatch(getAllProductsFailure());
  }
};

export const deleteProduct = async (
  dispatch,
  id,
) => {
  dispatch(deleteProductRequest());
  try {
    const response = await userRequest.delete(
      `/products/${id}`,
    );
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (
  dispatch,
  product,
  id,
) => {
  dispatch(updateProductRequest());
  try {
    const response = await userRequest.put(
      `/products/${id}`,
      product,
    );
    const updatedProduct =
      response.data.updatedProduct;
    dispatch(
      updateProductSuccess({
        id,
        updatedProduct,
      }),
    );
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const addProduct = async (
  dispatch,
  product,
) => {
  dispatch(addProductRequest());
  try {
    const response = await userRequest.post(
      `/products/add`,
      product,
    );
    dispatch(
      addProductSuccess(
        response.data.savedProduct,
      ),
    );
  } catch (error) {
    dispatch(addProductFailure());
  }
};
export const getAllUsers = async (dispatch) => {
  dispatch(getAllUsersRequest());
  try {
    const response = await userRequest.get(
      "/users",
    );
    dispatch(
      getAllUsersSuccess(response.data.users),
    );
  } catch (error) {
    dispatch(getAllProductsFailure());
  }
};

export const addUser = async (dispatch, user) => {
  dispatch(addUserRequest());
  try {
    const response = await userRequest.post(
      "/users/register",
      user,
    );
    dispatch(addUserSuccess(response.data));
  } catch (error) {
    dispatch(addUserFailure());
  }
};
export const updateUser = async (
  dispatch,
  user,
  id,
) => {
  dispatch(addUserRequest());
  try {
    const response = await userRequest.put(
      `/users/${id}`,
      user,
    );
    dispatch(addUserSuccess({ updatedUser, id }));
  } catch (error) {
    dispatch(addUserFailure());
  }
};
