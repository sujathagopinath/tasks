import { createStore, applyMiddleware } from "redux";
import { createLogic, createLogicMiddleware } from "redux-logic";
import axios from "axios";

const initialState = {
    list: [],
    fetchStatus: ""
};

const USERS_FETCH = "USERS_FETCH";
const USERS_FETCH_CANCEL = "USERS_FETCH_CANCEL";
const USERS_FETCH_FULFILLED = "USERS_FETCH_FULFILLED";
const USERS_FETCH_REJECTED = "USERS_FETCH_REJECTED";
function usersFetch() {
    console.log("action USERS_FETCH dispatched");
    return { type: USERS_FETCH };
}
function usersFetchCancel() {
    console.log("action USERS_FETCH_CANCEL dispatched");
    return { type: USERS_FETCH_CANCEL };
}
function usersFetchFulfilled(users) {
    return { type: USERS_FETCH_FULFILLED, payload: users };
}
function usersFetchRejected(err) {
    return { type: USERS_FETCH_REJECTED, payload: err, errror: true };
}

const delay = 2; // 2s delay for interactive use of cancel/take latest
const usersFetchLogic = createLogic({
    type: USERS_FETCH,
    cancelType: USERS_FETCH_CANCEL,
    latest: true, // take latest only

    // use axios injected as httpClient from configureStore logic deps
    // we also have access to getState and action in the first argument
    // but they were not needed for this particular code
    async process({ httpClient }, dispatch, done) {
        try {
            // the delay query param adds arbitrary delay to the response
            const users = await httpClient
                .get(`https://reqres.in/api/users?delay=${delay}`)
                .then(resp => resp.data.data); // use data property of payload
            dispatch(usersFetchFulfilled(users));
        } catch (err) {
            console.error(err); // log since could be render err
            dispatch(usersFetchRejected(err));
        }
        done();
    }
});

const deps = {
    // injected dependencies for logic
    httpClient: axios
};
const arrLogic = [usersFetchLogic];
const logicMiddleware = createLogicMiddleware(arrLogic, deps);
const store = createStore(
    reducer,
    initialState,
    applyMiddleware(logicMiddleware)
);

const containerDiv = document.getElementById("appContainer");
store.subscribe(() => {
    const state = store.getState();
    console.log("state fetchStatus:%o list:%o", state.fetchStatus, state.list);
    containerDiv.innerHTML += formatStateForHTML(state);
});

function formatStateForHTML(state) {
    return `<div>
     <div>State at: ${Date.now()}</div>
     <div>fetchStatus: ${state.fetchStatus}</div>
     <ul>
       ${state.list.map(x => "<li>" + JSON.stringify(x) + "</li>")}
     </ul>
     <div>&nbsp;</div>
   </div>
   `;
}

// let's trigger some actions
store.dispatch(usersFetch());
setTimeout(() => {
    store.dispatch(usersFetchCancel()); // cancelled
    setTimeout(() => {
        store.dispatch(usersFetch()); // demonstrate takeLatest
        setTimeout(() => {
            store.dispatch(usersFetch()); // only the latest is used
        }, 1000);
    }, 1000);
}, 1000);

function reducer(state = initialState, action) {
    switch (action.type) {
        case USERS_FETCH:
            return {
                ...state,
                fetchStatus: `fetching... ${new Date().toLocaleString()}`,
                list: []
            };
        case USERS_FETCH_FULFILLED:
            return {
                ...state,
                list: action.payload,
                fetchStatus: `Results from ${new Date().toLocaleString()}`
            };
        case USERS_FETCH_REJECTED:
            return {
                ...state,
                fetchStatus: `errored: ${action.payload}`
            };
        case USERS_FETCH_CANCEL:
            return {
                ...state,
                fetchStatus: "user cancelled"
            };
        default:
            return state;
    }
}
