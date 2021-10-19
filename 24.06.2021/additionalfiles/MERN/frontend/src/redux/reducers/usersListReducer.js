import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
  MANAGE_USERS_REQUEST,
  MANAGE_USERS_FAIL,
  MANAGE_USERS_SUCCESS
} from '../actions/actionTypes';

const usersListReducer = (state = [], action) => {
  switch (action.type) {
    // Register
    case FETCH_USERS_REQUEST:
      return { loading: true };
    case FETCH_USERS_SUCCESS:
      return {
        users: action.payload,
      };
    case FETCH_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case MANAGE_USERS_REQUEST:
      return { loading: true };

    case MANAGE_USERS_SUCCESS:
      return {
        users: action.payload,
      };
    case MANAGE_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


export default usersListReducer;
