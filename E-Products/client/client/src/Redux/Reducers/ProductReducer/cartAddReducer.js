import {
  ADDCART_PRODUCT_FAIL,
  ADDCART_PRODUCT_REQUEST,
  ADDCART_PRODUCT_SUCCESS,
} from '../../Actions/Products/actionTypes';

const cartAddReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDCART_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case ADDCART_PRODUCT_SUCCESS:
      return {
        product: action.payload,
        loading: false,
      };
    case ADDCART_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default cartAddReducer;
