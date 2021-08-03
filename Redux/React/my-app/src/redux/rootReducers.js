import { combineReducers } from "redux";
import cakeReducer from "./cakes/cakereducer";
import icecreamReducer from "./icecreams/iceReducer";

const rootReducer = combineReducers({
    cake: cakeReducer,
    ice: icecreamReducer
})

export default rootReducer