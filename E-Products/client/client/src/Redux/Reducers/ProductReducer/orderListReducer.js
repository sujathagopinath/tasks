import {
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL,
} from "../../Actions/Products/actionTypes";

const orderListReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return {
        loading: true,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        orders: action.payload,

        loading: false,
      };
    case FETCH_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderListReducer;
