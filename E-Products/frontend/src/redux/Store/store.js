import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from '../Reducers/userReducer';


const reducer = combineReducers({
  userLogin: userReducer
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
