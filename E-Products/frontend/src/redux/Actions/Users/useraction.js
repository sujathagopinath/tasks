import axios from 'axios';
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_LOGOUT,
} from './actionTypes';

export const registerUser = (userName, userEmail, userPassword) => {
  return async dispatch => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: { 'Content-Type': 'application/json' },
      };

      const { data } = await axios.post(
        '/api/users/signup',
        {
          userName,
          userEmail,
          userPassword
        },
        config
      );
      dispatch({
        type: USER_REGISTER_SUCCESS,
      });

      
      sessionStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      console.log('dberror', error);
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const loginUser = (userEmail, userPassword) => {
  return async dispatch => {

    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        // credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/users/signin',
        { userEmail, userPassword },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      sessionStorage.setItem('userData', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response.data.message, 
      });
    }
  };
};

export const getUserProfile = () => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    console.log(userInfo)
    try {
      dispatch({
        type: USER_PROFILE_REQUEST,
      });
      const config = {
        headers: {
          authorization: `Bearer ${userInfo.access_token}`,
        },
        params: {
          id: JSON.parse(sessionStorage.getItem('userData')).userId
        }
      };
      // console.log(JSON.parse(sessionStorage.getItem('userData')).email);

      const { data } = await axios.get('/api/users/getuserdata', config);
      dispatch({
        type: USER_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_PROFILE_FAIL,
        payload: error.response && error.response.data.message,
      });
    }
  };
};


export const logoutUser = () => {
  return async dispatch => {
    sessionStorage.removeItem('userData');
    try {
      dispatch({
        type: USER_LOGOUT,
      });
    } catch (error) { }
  };
};


