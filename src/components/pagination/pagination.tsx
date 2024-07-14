import { ResponsePage } from '@/types/types';
import classes from './pagination.module.css';

export type PaginationProps = {
  page: ResponsePage;
  handleChangePage: (page: number) => void;
};
type Direction = 'prev' | 'next';

export const Pagination = ({ page, handleChangePage }: PaginationProps) => {
  const handleClickArrow = (direction: Direction) => {
    if (direction === 'prev' && !page.firstPage) handleChangePage(page.pageNumber - 1);
    if (direction === 'next' && !page.lastPage) handleChangePage(page.pageNumber + 1);
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
