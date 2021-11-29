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
    );
    dispatch(
      updateProductSuccess({ id, product }),
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
      { product },
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
