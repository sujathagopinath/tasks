const redux = require('redux')
const createStore = redux.createStore

const initalstate = {
    loading: false,
    users: [],
    error: ''
}

const FETCH_USERS_REQUEST = 'FETCH_USER_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USER_FAILURE'

const fetchUserrequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersuccess = users => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users //payload set to argument users
    }
}

const fetchUserfailure = error => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const reducer = (state = initalstate, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                users: [],
                error: action.payload
            }
    }

}

const store = createStore(reducer)