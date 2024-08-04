import Link from 'next/link';
import classes from './pagination.module.css';
import { makeHref } from '@/helpers/makeHref';
import { Params, ResponsePage } from '@/types/types';

type PaginationProps = {
  params: Params;
  page: ResponsePage;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const Pagination = ({ page, params, searchParams }: PaginationProps) => {
  const { pageNumber } = page;

  return (
    <div className={classes.container} data-testid="pagination-container">
      <div className={classes.pagination}>
        <Link
          className={classes.arrow}
          data-disabled={page.firstPage}
          data-testid="pagination-btn-prev"
          href={makeHref({ pageNumber, params, searchParams })}
        >
          ◀
        </Link>
        <span className={classes.currentPage} data-testid="pagination-text-page">
          {page.pageNumber + 1} / {page.totalPages}
        </span>
        <Link
          className={classes.arrow}
          data-disabled={page.lastPage}
          data-testid="pagination-btn-next"
          href={makeHref({ pageNumber: pageNumber + 2, params, searchParams })}
        >
          ▶
        </Link>
      </div>
    </div>
  );
};
