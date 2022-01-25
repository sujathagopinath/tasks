import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from '../Reducers/UserReducer/userReducer';
import userProfileReducer from '../Reducers/UserReducer/userProfileReducer'
import usersListReducer from '../Reducers/UserReducer/userListReducer';
import userUpdateReducer from '../Reducers/UserReducer/userUpdateReducer';
import createdProductReducer from '../Reducers/ProductReducer/createdProductReducer';
import productListReducer from '../Reducers/ProductReducer/productListReducer';
// import cartAddReducer from '../Reducers/ProductReducer/cartAddReducer';

const reducer = combineReducers({
  userLogin: userReducer,
  userProfile: userProfileReducer,
  usersList: usersListReducer,
  updatedUser: userUpdateReducer,
  productCreated: createdProductReducer,
  Productslist: productListReducer,
  // cartAdd: cartAddReducer
});
const middleware = [thunk]

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
