import { BUY_ICE } from './iceType'

const initialstate = {
    numberofice: 20
}

const icecreamReducer = (state = initialstate, action) => {
    switch (action.type) {
        case BUY_ICE: return {
            ...state,
            numberofice: state.numberofice - 1
        }
        default: return state
    }
}

export default icecreamReducer