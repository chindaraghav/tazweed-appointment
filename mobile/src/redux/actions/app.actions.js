import {IS_LOGGED_IN, SET_USER_ID} from '../actionTypes';

export const isLoggedIn = (payload) => ({
  type: IS_LOGGED_IN,
  payload,
});

export const setUserId = (payload) => ({
  type: SET_USER_ID,
  payload,
});
