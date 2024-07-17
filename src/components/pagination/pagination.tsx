import classes from './pagination.module.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  nextPage,
  prevPage,
  selectFirstPage,
  selectLastPage,
  selectPageNumber,
  selectTotalPage,
} from '@components/pagination/paginationSlice';
import { useEffect } from 'react';

export const Pagination = () => {
  const dispatch = useDispatch();
  const lastPage = useSelector(selectLastPage);
  const firstPage = useSelector(selectFirstPage);
  const totalPages = useSelector(selectTotalPage);
  const pageNumber = useSelector(selectPageNumber);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search') || '';
    setSearchParams({ search, page: `${pageNumber + 1}` });
  }, [pageNumber, searchParams, setSearchParams]);

  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
        <button
          onClick={() => dispatch(prevPage())}
          className={classes.arrow}
          disabled={firstPage}
          data-testid="pagination-btn-prev"
        >
          ◀
        </button>
        <span className={classes.currentPage} data-testid="pagination-text-page">
          {pageNumber + 1} / {totalPages}
        </span>
        <button
          onClick={() => dispatch(nextPage())}
          className={classes.arrow}
          disabled={lastPage}
          data-testid="pagination-btn-next"
        >
          ▶
        </button>
      </div>
    </div>
  );
};
