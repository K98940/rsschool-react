import { MemoryRouter } from 'react-router-dom';
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

describe('Pagination component', () => {
  const renderComponent = ({ page }: PaginationProps) => {
    return {
      snapshot: render(
        <MemoryRouter initialEntries={['http://localhost:5173/?search=one&page=1']}>
          <Pagination page={page} />
        </MemoryRouter>,
      ),
      btnPrev: screen.getByTestId('pagination-btn-prev'),
      btnNext: screen.getByTestId('pagination-btn-next'),
    };
  };

  it('should render button Prev', async () => {
    const { btnPrev } = renderComponent({ page });

    expect(btnPrev).toBeInTheDocument();
  });

  it('should render button Next', async () => {
    const { btnNext } = renderComponent({ page });

    expect(btnNext).toBeInTheDocument();
  });
});
