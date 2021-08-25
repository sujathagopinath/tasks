import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from '../reducers/userAuthReducer';
import userProfileReducer from '../reducers/userProfileReducer';
import userUpdateReducer from '../reducers/userUpdateReducer';
import createdBookReducer from '../reducers/books/createdBookReducer';
import booksListReducer from '../reducers/books/booksListReducer';
import bookDetailReducer from '../reducers/books/bookDetailsReducer';
import usersListReducer from '../reducers/usersListReducer';

const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userReducer,
  userProfile: userProfileReducer,
  updatedUser: userUpdateReducer,
  bookCreated: createdBookReducer,
  booksList: booksListReducer,
  bookDetails: bookDetailReducer,
  usersList: usersListReducer,
});

//store
//Get the user in Session storage

const userAuthFromStorage = sessionStorage.getItem('userAuthData')
  ? JSON.parse(sessionStorage.getItem('userAuthData'))
  : null;

const initialState = {
  userLogin: { userInfo: userAuthFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
