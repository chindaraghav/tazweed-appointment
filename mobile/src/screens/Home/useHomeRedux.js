import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {fetchUsers} from '../../redux/actions/sellers.actions';

function useHomeRedux() {
  const dispatch = useDispatch();

  // state
  const sellerList = useSelector((state) => state.sellers.data);
  const isEndReached = useSelector((state) => state.sellers.isEndReached);
  const isLoading = useSelector((state) => state.sellers.isLoading);
  const error = useSelector((state) => state.sellers.error);

  // actions
  const getUsers = useCallback((page) => {
    dispatch(fetchUsers({page}));
  }, []);

  const state = {sellerList, isEndReached, isLoading, error};
  const actions = {getUsers};

  return {state, actions};
}

export default useHomeRedux;
