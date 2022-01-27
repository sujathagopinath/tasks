import axios from "axios";
import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  ADDCART_PRODUCT_REQUEST,
  ADDCART_PRODUCT_SUCCESS,
  ADDCART_PRODUCT_FAIL,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAIL,
} from "./actionTypes.js";

export const createProduct = (productData) => {
  console.log("pro", productData);
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: CREATE_PRODUCT_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.access_token}`,
        },
      };
      const { data } = await axios.post(
        "/api/products/create",
        productData,
        config
      );
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateProduct = (productId, productData) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.access_token}`,
        },
      };
      const { data } = await axios.put(
        `/api/products/update/${productId}`,
        productData,
        config
      );
      console.log("productdata", productData);

      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: FETCH_PRODUCT_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.access_token}`,
        },
      };
      const { data } = await axios.get("/api/products/allproducts", config);

      dispatch({
        type: FETCH_PRODUCT_SUCCESS,
        payload: data,
      });
      console.log("products", data);
    } catch (error) {
      dispatch({
        type: FETCH_PRODUCT_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: DELETE_PRODUCT_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.access_token}`,
        },
      };
      const { data } = await axios.delete(
        `/api/products/deleteproduct/${productId}`,
        config
      );
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PRODUCT_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};

export const addCart = (productdetail) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;

    try {
      dispatch({
        type: ADDCART_PRODUCT_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.access_token}`,
        },
        params: {
          productId: JSON.parse(sessionStorage.getItem("cartproduct"))
            .productId,
        },
      };
      const { data } = await axios.post(
        "/api/products/cart",
        productdetail,
        config
      );

      dispatch({
        type: ADDCART_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADDCART_PRODUCT_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};

export const deleteItem = (productId) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: DELETE_ITEM_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.access_token}`,
        },
      };
      const { data } = await axios.delete(
        `/api/products/removeitem/${productId}`,
        config
      );
      dispatch({
        type: DELETE_ITEM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_ITEM_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};
