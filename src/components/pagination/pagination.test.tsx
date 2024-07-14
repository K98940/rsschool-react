import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Pagination, PaginationProps } from './pagination';

const page = {
  pageNumber: 1,
  pageSize: 2,
  numberOfElements: 2,
  totalElements: 4,
  totalPages: 2,
  firstPage: false,
  lastPage: false,
};
const handleChangePage = vi.fn((n) => {
  page.pageNumber = n;
});

describe('Pagination component', () => {
  const renderComponent = ({ page, handleChangePage }: PaginationProps) => {
    return {
      snapshot: render(<Pagination page={page} handleChangePage={handleChangePage} />),
      btnPrev: screen.getByTestId('pagination-btn-prev'),
      btnNext: screen.getByTestId('pagination-btn-next'),
    };
  };

  it('click Next button increase pageNumber', async () => {
    const { btnNext } = renderComponent({ page, handleChangePage });
    const user = userEvent.setup();

    await user.click(btnNext);
    expect(page.pageNumber).toBe(2);
  });

  it('click Prev button decrease pageNumber', async () => {
    const { btnPrev } = renderComponent({ page, handleChangePage });
    const user = userEvent.setup();

    await user.click(btnPrev);
    expect(page.pageNumber).toBe(1);
  });
});
