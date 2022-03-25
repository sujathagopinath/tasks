import {
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  
} from "../actions/actiontypes";

const userReducer = (state = {}, action:any) => {
  switch (action.type) {
   
  
    case ADD_USER_REQUEST:
      return { loading: true };
    case ADD_USER_SUCCESS:
      return {
        loading: false,
        userData: action.payload,
      };
    case ADD_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    
    default:
      return state;
  }
};

export default userReducer;
