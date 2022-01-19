import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
} from '../../Actions/Products/actionTypes';

const createdProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        product: action.payload,
        loading: false,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createdProductReducer;
