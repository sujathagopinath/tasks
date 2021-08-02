// console.log("From index.js")
const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers
const reduxlogger = require('redux-logger')
const applyMiddleware = redux.applyMiddleware
const logger = reduxlogger.createLogger()
const BUY_CAKE = 'BUY_CAKE'
const BUY_ICE = 'BUY_ICE'

function buycake() {
    return {
        type: BUY_CAKE,
        info: 'First redux action'
    }
}

function buyice() {
    return {
        type: BUY_ICE

    }
}
//(previousState, action) => newstate

// const initialstate = {
//     numberofcake: 10,
//     numberoficecream: 20
// }
const initalCakestate = {
    numberofCake: 10
}
const initalicecreamstate = {
    numberoficecream: 20
}
const cakereducer = (state = initalCakestate, action) => {
    switch (action.type) {
        case BUY_CAKE: return {
            ...state,
            numberofCake: state.numberofCake - 1
        }

        default: return state
    }
}
const icereducer = (state = initalicecreamstate, action) => {
    switch (action.type) {
        case BUY_ICE: return {
            ...state,
            numberoficecream: state.numberoficecream - 1
        }
        default: return state


    }
}
//combining two reducers using routes 

const rootReducer = combineReducers({
    cake: cakereducer,
    icecream: icereducer
})

const store = createStore(rootReducer, applyMiddleware(logger))
// const store = createStore(reducer)  //create store accepts function reducer as a parameter
console.log('Intial state: ', store.getState())
// const unsubscribe = store.subscribe(() => {
//     console.log('updated state', store.getState())
// })
const unsubscribe = store.subscribe(() => { })


store.dispatch(buycake())
store.dispatch(buyice())
store.dispatch(buycake())
store.dispatch(buyice())
store.dispatch(buycake())
store.dispatch(buyice())

unsubscribe()
