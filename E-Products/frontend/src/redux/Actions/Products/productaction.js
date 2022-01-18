import axios from 'axios';
import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,

} from './actionTypes.js'

export const createProduct = productData => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: CREATE_PRODUCT_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.access_token}`
        },
      };
      // console.log("product", data)
      const { data } = await axios.post('/api/products/create', productData, config);   
      dispatch({
        type: CREATE_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_PRODUCT_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
};