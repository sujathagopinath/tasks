import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from '../Reducers/UserReducer/userReducer';
import userProfileReducer from '../Reducers/UserReducer/userProfileReducer'


const reducer = combineReducers({
  userLogin: userReducer,
  userProfile:userProfileReducer
});
const middleware = [thunk]
//store
//Get the user in Session storage

const userDataFromStorage = sessionStorage.getItem('userData')
  ? JSON.parse(sessionStorage.getItem('userData'))
  : null;

const initialState = {
  userLogin: { userInfo: userDataFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);



export default store;
