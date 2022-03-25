import React, { useReducer } from 'react'
import { createStore, applyMiddleware } from "redux";
import { createLogic, createLogicMiddleware } from "redux-logic";
import axios from "axios";


const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET = "RESET";

type CounterState = {
    count: number
}

type UpdateAction = {
    type: 'INCREMENT' | 'DECREMENT'
    payload: number
}

type ResetAction = {
    type: 'RESET'
}

type CounterAction = UpdateAction | ResetAction

const initialState = { count: 0 }

function reducer(state: CounterState, action: CounterAction) {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + action.payload }
        case 'DECREMENT':
            return { count: state.count - action.payload }
        case 'RESET':
            return initialState
        default:
            return state
    }
}

const userCountLogic = createLogic({
    type: INCREMENT,
    cancelType: DECREMENT,
    latest: true,
    process({ getState, action }, dispatch, done) {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(resp => resp.data.todos)
            .then(todos => dispatch({ type: INCREMENT, payload: todos }))
            .catch(err => {
                console.error(err);
                dispatch({
                    type: RESET, payload: err,
                    error: true
                })
            });
        done();


    }
})

const arrLogic = [userCountLogic];
const logicMiddleware = createLogicMiddleware(arrLogic);
const store = createStore(
    reducer,
    initialState,
    applyMiddleware(logicMiddleware)
);

export const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'INCREMENT', payload: 10 })}>
                Increment 10
            </button>
            <button onClick={() => dispatch({ type: 'DECREMENT', payload: 10 })}>
                Decrement 10
            </button>
            <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        </>
    )
}
