import {
    IS_LOGGED_IN
} from "../actionTypes";

const initialState = {
    isLoggedIn: false
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case IS_LOGGED_IN:
            return { ...state, isLoggedIn: payload }

        default:
            return state
    }
}
