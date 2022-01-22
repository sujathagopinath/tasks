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
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAIL,
  FETCH_USERS_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_LOGOUT,
} from './actionTypes';

export const registerUser = (userName, userEmail, userPassword,isAdmin) => {
  return async dispatch => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      console.log('isad',isAdmin)
      const { data } = await axios.post(
        '/api/users/signup',
        {
          userName,
          userEmail,
          userPassword,
          isAdmin
          
        },
        config
      );
      dispatch({
        type: USER_REGISTER_SUCCESS,
      });

      
      sessionStorage.setItem('userAuthData', JSON.stringify(data));
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
console.log('logindata',data)
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
      });
     
      sessionStorage.setItem('userAuthData', JSON.stringify(data));
      sessionStorage.setItem('access_token', JSON.stringify(data.access_token));
       sessionStorage.setItem('isAdmin', JSON.parse(data.userdata[0].isAdmin))
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
          id: JSON.parse(sessionStorage.getItem('userAuthData')).userName
        }
      };
      console.log('data',JSON.parse(sessionStorage.getItem('userAuthData')).userName)

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

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_USERS_REQUEST,
        loading: true,
      });
      const { userInfo } = getState().userLogin;
      console.log('userInfo',userInfo);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.access_token}`,

        },
      };
      const { data } = await axios.get('/api/users/allusers', config);
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};


export const updateUser = (userName, userEmail, userPassword) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
        loading: true,
      });
      const { userInfo } = getState().userLogin;
      console.log('token', userInfo.access_token);
      console.log('data', userInfo.userdata);
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.access_token}`,
        },
      };
      // const id = JSON.parse(sessionStorage.getItem('userAuthData')).userdata[0].userId
      // console.log('id',id)
      const { data } = await axios.put(
        '/api/users/update',
        { userName, userEmail, userPassword},
        config
      );
      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const logoutUser = () => {
  return async dispatch => {
    sessionStorage.clear()
    try {
      dispatch({
        type: USER_LOGOUT,
      });
    } catch (error) { }
  };
};


