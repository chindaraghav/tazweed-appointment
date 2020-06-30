import {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {searchUsers} from '../../redux/actions/sellers.actions';

function useSearchRedux() {
  const dispatch = useDispatch();
  const sellerList = useSelector((state) => state.sellers.searchedList);
  const isLoading = useSelector((state) => state.sellers.isLoading);
  const error = useSelector((state) => state.sellers.error);

  const searchSeller = useCallback((name) => {
    dispatch(searchUsers({name}));
  }, []);

  const state = {sellerList, isLoading, error};
  const actions = {searchSeller};
  return {state, actions};
}

export default useSearchRedux;
