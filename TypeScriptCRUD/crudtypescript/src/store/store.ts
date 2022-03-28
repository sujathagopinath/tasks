import { createStore, combineReducers, applyMiddleware,compose } from "redux";
import { createLogicMiddleware } from "redux-logic";
import AddUserLogic from "./logic";
import userReducer from "./reducers/userReducer";

export const rootReducer = combineReducers({
  users: userReducer
});

const initialState = {
  users:[]
};


const logicMiddleware = createLogicMiddleware([AddUserLogic])
const composedMiddleware = compose(applyMiddleware(logicMiddleware))

export const store = createStore
    (
        rootReducer,
        initialState,
        composedMiddleware
    );