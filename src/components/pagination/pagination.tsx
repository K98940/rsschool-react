import { ResponsePage } from '@/types/types';
import classes from './pagination.module.css';
import { useSearchParams } from 'react-router-dom';

export type PaginationProps = {
  page: ResponsePage;
};
type Direction = 'prev' | 'next';

export const Pagination = ({ page }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClickArrow = (direction: Direction) => {
    let newPage = page.pageNumber;
    if (direction === 'prev' && !page.firstPage) newPage = page.pageNumber - 1;
    if (direction === 'next' && !page.lastPage) newPage = page.pageNumber + 1;

    if (newPage !== page.pageNumber) {
      const search = searchParams.get('search') || '';
      setSearchParams({ search, page: `${newPage + 1}` });
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.pagination}>
        <button
          onClick={() => handleClickArrow('prev')}
          className={classes.arrow}
          disabled={page.firstPage}
          data-testid="pagination-btn-prev"
        >
          ◀
        </button>
        <span className={classes.currentPage} data-testid="pagination-text-page">
          {page.pageNumber + 1} / {page.totalPages}
        </span>
        <button
          onClick={() => handleClickArrow('next')}
          className={classes.arrow}
          disabled={page.lastPage}
          data-testid="pagination-btn-next"
        >
          ▶
        </button>
      </div>
    </div>
  );
};
