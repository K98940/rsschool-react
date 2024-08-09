import { NavLink } from '@remix-run/react';
import { ResponsePage } from '@/types/types';
import classes from './pagination.module.css';

type PaginationProps = {
  page: ResponsePage;
  search: string;
};

export const Pagination = ({ page, search }: PaginationProps) => {
  const { totalPages, pageNumber } = page;
  const newSearch = search ? `?search=${search}` : '';
  const nextPageNumber = pageNumber + 2;

  return (
    <div className={classes.container} data-testid="pagination-container">
      <div className={classes.pagination}>
        <NavLink
          to={{
            pathname: `/page/${pageNumber}`,
            search: `${newSearch}`,
          }}
          className={classes.arrow}
          data-disabled={page.firstPage}
          data-testid="pagination-link-prevPage"
        >
          ◀
        </NavLink>
        <span className={classes.currentPage} data-testid="pagination-text-page">
          {pageNumber + 1} / {totalPages}
        </span>
        <NavLink
          to={{
            pathname: `/page/${nextPageNumber}`,
            search: `${newSearch}`,
          }}
          className={classes.arrow}
          data-disabled={page.lastPage}
          data-testid="pagination-link-nextPage"
        >
          ▶
        </NavLink>
      </div>
    </div>
  );
};
