import Spinner from '../spinner/spinner';
import classes from './pagination.module.css';
import { useAppSelector } from '@/hooks/hooks';
import useGetParams from '@/hooks/useGetParams';
import { useGetEpisodesQuery } from '@/api/apiSlice';
import { selectQuery } from '../episodes/episodesSlice';
import { isEpisodeBaseResponse } from '@/helpers/predicates';

const getHref = (pageNumber: number, id: string): string => `/page/${pageNumber}${id ? '/episode/' + id : ''}`;

export const Pagination = () => {
  const { router, pageNumber, id } = useGetParams();
  const query = useAppSelector(selectQuery);
  const { isFetching, data } = useGetEpisodesQuery({ query, pageNumber });
  if (!isEpisodeBaseResponse(data)) return;
  const { firstPage, lastPage, totalPages } = data.page;

  return (
    <div className={classes.container} data-testid="pagination-container">
      {isFetching && <Spinner />}
      <div className={classes.pagination}>
        <button
          onClick={() => {
            const href = getHref(pageNumber - 1, id);
            router.push(href);
          }}
          className={classes.arrow}
          disabled={firstPage || isFetching}
          data-testid="pagination-btn-prev"
        >
          ◀
        </button>
        <span className={classes.currentPage} data-testid="pagination-text-page">
          {pageNumber} / {totalPages}
        </span>
        <button
          onClick={() => {
            const href = getHref(pageNumber + 1, id);
            router.push(href);
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
