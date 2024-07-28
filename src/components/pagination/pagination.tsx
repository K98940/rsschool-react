import classes from './pagination.module.css';
import { useGetEpisodesQuery } from '@/api/apiSlice';
import { isEpisodeBaseResponse } from '@/helpers/predicates';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { nextPage, prevPage, selectQuery, selectPageNumber } from '../episodes/episodesSlice';

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const pageNumber = useAppSelector(selectPageNumber);
  const query = useAppSelector(selectQuery);
  const { isFetching, data } = useGetEpisodesQuery({ query, pageNumber });
  if (!isEpisodeBaseResponse(data)) return;
  const { firstPage, lastPage, totalPages } = data.page;

  return (
    <div className={classes.container} data-testid="pagination-container">
      <div className={classes.pagination}>
        <button
          onClick={() => {
            dispatch(prevPage());
          }}
          className={classes.arrow}
          disabled={firstPage || isFetching}
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
          }}
          className={classes.arrow}
          disabled={lastPage || isFetching}
          data-testid="pagination-btn-next"
        >
          ▶
        </button>
      </div>
    </div>
  );
};
