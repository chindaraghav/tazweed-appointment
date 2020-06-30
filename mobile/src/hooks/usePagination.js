import {useState} from 'react';

function usePagination() {
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return {page, fetchMoreData};
}

export default usePagination;
