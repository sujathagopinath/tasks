import React, { useReducer, useState } from 'react'
import { createStore, applyMiddleware } from "redux";
import { createLogic, createLogicMiddleware } from "redux-logic";
import axios from "axios";




const TODOS_FETCH = "TODOS_FETCH";
const TODOS_FETCH_CANCEL = "TODOS_FETCH_CANCEL";
const TODOS_FETCH_FULFILLED = "TODOS_FETCH_FULFILLED"

function todosFetch() {
    console.log("action TODOS_FETCH dispatched");
    return { type: TODOS_FETCH };
}

function todosFetchCancel() {
    console.log("action TODOS_FETCH_CANCEL dispatched");
    return { type: TODOS_FETCH_CANCEL };
}

function todosFetchFulfilled(todos: any) {
    return { type: TODOS_FETCH_FULFILLED, payload: todos };
}

// type CounterState = {
//     count: number
// }

type UpdateAction = {
    type: 'TODOS_FETCH'
    payload: []
}

type ResetAction = {
    type: 'TODOS_FETCH_CANCEL'
}

type SuccessAction = {
    type: 'TODOS_FETCH_FULFILLED'
    payload: []
}

type CounterAction = UpdateAction | ResetAction | SuccessAction

const initialState = {
    list: [],
    fetchStatus: ""
}

function reducer(state = initialState, action: CounterAction) {
    switch (action.type) {
        case TODOS_FETCH:
            return {
                ...state,
                fetchStatus: `fetching..`,
                list: []
            };
        case TODOS_FETCH_FULFILLED:
            return {
                ...state,
                list: action.payload,
                fetchStatus: `Results`
            };

        case TODOS_FETCH_CANCEL:
            return {
                ...state,
                fetchStatus: "user cancelled"
            };
        default:
            return state;
    }
}

const userCountLogic = createLogic({
    type: TODOS_FETCH,
    cancelType: TODOS_FETCH_CANCEL,
    latest: true,
    process({ getState, action }, dispatch, done) {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(resp => resp.data.todos)
            .then(todos => dispatch({ type: TODOS_FETCH_FULFILLED, payload: todos }))
            .catch(err => {
                console.error(err);
                dispatch({
                    type: TODOS_FETCH_CANCEL, payload: err,
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

store.subscribe(() => {
    const state = store.getState();
    console.log("state count", state.fetchStatus, state.list);
});

export const Todos = () => {
    const [posts, setPosts] = useState([])
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div>
            Count: {state.fetchStatus}
            {/* <button onClick={() => dispatch({ type: 'INCREMENT', payload: 10 })}>
                Increment
            </button>
            <button onClick={() => dispatch({ type: 'DECREMENT', payload: 10 })}>
                Decrement
            </button>*/}
            <button onClick={() => dispatch(todosFetchFulfilled())}>
                {posts.map(post => (
                    <p>{post}</p>
                ))}
            </button>


        </div>
    )
}


