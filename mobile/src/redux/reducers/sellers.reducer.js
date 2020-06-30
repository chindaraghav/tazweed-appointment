import {
  FETCH_SELLERS_LOADING,
  FETCH_SELLERS_SUCCESS,
  FETCH_SELLERS_FAILURE,
  SEARCH_SELLERS_LOADING,
  SEARCH_SELLERS_SUCCESS,
  SEARCH_SELLERS_FAILURE,
  RESET_ERROR,
} from '../actionTypes';
import {getErrorMessage} from '../../utils/helpers';
import cloneDeep from 'lodash/cloneDeep';
import {get} from 'lodash';

const initialState = {
  isLoading: false,
  data: [],
  searchedList: null,
  error: '',
  isEndReached: false,
};

export default (state = initialState, {type, payload, error, inputs}) => {
  switch (type) {
    case FETCH_SELLERS_LOADING:
      return {...state, isLoading: false};
    case FETCH_SELLERS_SUCCESS: {
      const {page} = inputs;
      let newData;
      const serverData = get(payload, 'data.results', []);
      if (page === 1) {
        newData = serverData;
      } else {
        let prevData = cloneDeep(state.data);
        newData = [...prevData, ...serverData];
      }
      const isEndReached = get(payload, 'data.totalPages', null) === page;
      return {...state, data: newData, isLoading: false, isEndReached};
    }
    case FETCH_SELLERS_FAILURE:
      return {...state, error: getErrorMessage(error)};

    case SEARCH_SELLERS_LOADING:
      return {...state, isLoading: true};
    case SEARCH_SELLERS_SUCCESS: {
      const searchedList = get(payload, 'data', []);
      return {...state, isLoading: false, searchedList};
    }
    case SEARCH_SELLERS_FAILURE:
      return {...state, isLoading: false, error: getErrorMessage(error)};
    case RESET_ERROR:
      return {...state, isLoading: false, error: null};
    default:
      return state;
  }
};
