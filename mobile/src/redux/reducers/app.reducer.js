import {IS_LOGGED_IN, SET_USER_ID} from '../actionTypes';

const initialState = {
  isLoggedIn: null,
  userId: null,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case IS_LOGGED_IN:
      return {...state, isLoggedIn: payload};
    case SET_USER_ID:
      return {...state, userId: payload};
    default:
      return state;
  }
};
