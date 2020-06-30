import { IS_LOGGED_IN } from '../actionTypes';

export const isLoggedIn = (payload) => ({
    type: IS_LOGGED_IN,
    payload
})
