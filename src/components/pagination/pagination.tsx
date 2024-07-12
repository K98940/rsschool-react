import { ResponsePage } from '@/types/types';
import classes from './pagination.module.css';

type PaginationProps = {
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
        <button onClick={() => handleClickArrow('prev')} className={classes.arrow} disabled={page.firstPage}>
          ◀
        </button>
        <span className={classes.currentPage}>
          {page.pageNumber + 1} / {page.totalPages}
        </span>
        <button onClick={() => handleClickArrow('next')} className={classes.arrow} disabled={page.lastPage}>
          ▶
        </button>
      </div>
    </div>
  );
};
