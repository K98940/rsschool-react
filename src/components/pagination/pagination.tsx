import classes from './pagination.module.css';
import {
  nextPage,
  prevPage,
  selectQuery,
  selectStatus,
  fetchEpisodes,
  selectLastPage,
  selectFirstPage,
  selectTotalPage,
  selectPageNumber,
} from '../episodes/episodesSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const lastPage = useAppSelector(selectLastPage);
  const firstPage = useAppSelector(selectFirstPage);
  const totalPages = useAppSelector(selectTotalPage);
  const pageNumber = useAppSelector(selectPageNumber);
  const status = useAppSelector(selectStatus);
  const query = useAppSelector(selectQuery);

  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
        <button
          onClick={() => {
            dispatch(prevPage());
            dispatch(fetchEpisodes({ query, page: pageNumber - 1 }));
          }}
          className={classes.arrow}
          disabled={firstPage || status === 'submitting'}
          data-testid="pagination-btn-prev"
        >
          ◀
        </button>
        <span className={classes.currentPage} data-testid="pagination-text-page">
          {pageNumber + 1} / {totalPages}
        </span>
        <button
          onClick={() => {
            dispatch(nextPage());
            dispatch(fetchEpisodes({ query, page: pageNumber + 1 }));
          }}
          className={classes.arrow}
          disabled={lastPage || status === 'submitting'}
          data-testid="pagination-btn-next"
        >
          ▶
        </button>
      </div>
    </div>
  );
};
