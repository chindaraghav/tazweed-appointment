import {
  FETCH_SELLERS_FAILURE,
  FETCH_SELLERS_LOADING,
  FETCH_SELLERS_SUCCESS,
  SEARCH_SELLERS_LOADING,
  SEARCH_SELLERS_SUCCESS,
  SEARCH_SELLERS_FAILURE,
} from '../actionTypes';
import {FetchSellersService, SearchSellerService} from '../../utils/services';

export const fetchUsers = (inputs) => async (dispatch) =>
  new FetchSellersService().makeRequest(
    inputs,
    {
      LOADING: FETCH_SELLERS_LOADING,
      SUCCESS: FETCH_SELLERS_SUCCESS,
      FAILED: FETCH_SELLERS_FAILURE,
    },
    dispatch,
  );

export const searchUsers = (inputs) => async (dispatch) =>
  new SearchSellerService().makeRequest(
    inputs,
    {
      LOADING: SEARCH_SELLERS_LOADING,
      SUCCESS: SEARCH_SELLERS_SUCCESS,
      FAILED: SEARCH_SELLERS_FAILURE,
    },
    dispatch,
  );
