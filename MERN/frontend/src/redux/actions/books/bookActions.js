import axios from 'axios';
import {
  CREATE_BOOK_FAIL,
  CREATE_BOOK_REQUEST,
  CREATE_BOOK_SUCCESS,
  FETCH_BOOK_FAIL,
  FETCH_BOOK_REQUEST,
  FETCH_BOOK_SUCCESS,
  DELETE_BOOK_FAIL,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_REQUEST,
  BOOK_DETAIL_SUCCESS,
  BOOK_DETAIL_FAIL,
  BOOK_DETAIL_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_FAIL,
} from '../actionTypes';

//Create book

export const createBook = bookData => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: CREATE_BOOK_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`
        },
      };
      // console.log("booked", data)
      const { data } = await axios.post('/api/books', bookData, config);   //category title author createdby
      dispatch({
        type: CREATE_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_BOOK_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
};

//Fetch all books

export const fetchBooks = () => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: FETCH_BOOK_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`
        },
      };
      const { data } = await axios.get('/api/books', config);

      dispatch({
        type: FETCH_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_BOOK_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//delete a book

export const deleteBook = id => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: DELETE_BOOK_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`
        },
      };
      const { data } = await axios.delete(`/api/books/${id}`, config);
      dispatch({
        type: DELETE_BOOK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_BOOK_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//Fetch a signle book
export const fetchBook = (id, bookData) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: BOOK_DETAIL_REQUEST,
        loading: true,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`
        },
      };
      const { data } = await axios.get(`/api/books/${id}`, bookData, config);

      dispatch({
        type: BOOK_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_DETAIL_FAIL,
        error: error.response && error.response.data.message,
      });
    }
  };
};

//UPDATE BOOK

export const updateBook = (id, bookData) => {
  return async (dispatch, getState) => {
    const { userInfo } = getState().userLogin;
    try {
      dispatch({
        type: BOOK_UPDATE_REQUEST,
        loading: true,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${userInfo.token}`
        },
      };
      const { data } = await axios.put(`/api/books/${id}`, bookData, config)
      console.log("bookdata", bookData)

      dispatch({
        type: BOOK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOK_UPDATE_FAIL,
        loading: false,
        error: error.response && error.response.data.message,
      });
    }
  };
};











//createbook
// await axios.post('/api/books', bookData, config)  //category title author createdby
      // .then((res) => {
      //   console.log("resposne", res.data.book)

      // }).catch((error) => {
      //   console.log("error", error)
      // })

//update
// .then((res) => {
      //   console.log("newresposne", res)
      // }).catch((error) => {
      //   console.log("newerr", error)
      // })
