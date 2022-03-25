import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";

export const rootReducer = combineReducers({
  users: userReducer
});

const Auth = sessionStorage.getItem('userData')
console.log(Auth)

export const store = createStore(rootReducer, applyMiddleware(thunk));