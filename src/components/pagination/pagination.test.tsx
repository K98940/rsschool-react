import { Pagination } from './pagination';
import mockRouter from 'next-router-mock';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithProviders } from '@/mocks/utils/utils';

const searchParams: { [key: string]: string | string[] | undefined } = { search: '' };
const params: { page?: string; id?: string } = { page: '1', id: '' };
const pageData = {
  pageNumber: 0,
  pageSize: 10,
  numberOfElements: 10,
  totalElements: 860,
  totalPages: 86,
  firstPage: true,
  lastPage: false,
};

describe('Pagination component', () => {
  test('should render Pagination component with control buttons and a page`s indicator', async () => {
    mockRouter.push('/');
    renderWithProviders(<Pagination searchParams={searchParams} params={params} page={pageData} />);

    const container = await screen.findByTestId('pagination-container');
    const buttonPrev = await screen.findByTestId('pagination-btn-prev');
    const buttonNext = await screen.findByTestId('pagination-btn-next');
    const indicator = await screen.findByTestId('pagination-text-page');

    expect(container).toBeInTheDocument();
    expect(buttonPrev).toBeInTheDocument();
    expect(buttonNext).toBeInTheDocument();
    expect(indicator).toHaveTextContent(/1 \//i);
  });
});
