import axios from 'axios'
import {
    ADD_USER_REQUEST,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL
} from './actiontypes';


export const registerUser = (IBaseUser:any) => {
  return async (dispatch:any) => {
    try {
      dispatch({
    
        type:ADD_USER_REQUEST, 
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const { data } = await axios.post(
        "http://localhost:5000/user",
        {
         IBaseUser
        },
        config
      );
      console.log(data);
      dispatch({
        type: ADD_USER_SUCCESS,
        payload:data
      });
       sessionStorage.setItem("Data", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: ADD_USER_FAIL,
        payload:
          console.log(error)
      });
    }
  };
};



