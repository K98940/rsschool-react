import { setupServer } from 'msw/node';
import { Pagination } from './pagination';
import mockRouter from 'next-router-mock';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/mocks/utils/utils';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';
import { afterAll, afterEach, beforeAll, describe, expect, test, vitest } from 'vitest';

const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
  vitest.mock('next/router', () => require('next-router-mock'));
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Pagination component', () => {
  test('should render Pagination component with control buttons and a page`s indicator', async () => {
    mockRouter.push('/');
    renderWithProviders(<Pagination />);

    const container = await screen.findByTestId('pagination-container');
    const buttonPrev = await screen.findByTestId('pagination-btn-prev');
    const buttonNext = await screen.findByTestId('pagination-btn-next');
    const indicator = await screen.findByTestId('pagination-text-page');

    expect(container).toBeInTheDocument();
    expect(buttonPrev).toBeInTheDocument();
    expect(buttonNext).toBeInTheDocument();
    expect(indicator).toHaveTextContent(/1 \//i);
  });
  test('after click the `next button` should render next page', async () => {
    const user = userEvent.setup();
    mockRouter.push('/');
    renderWithProviders(<Pagination />);

    const buttonNext = await screen.findByTestId('pagination-btn-next');
    await user.click(buttonNext);

    expect(mockRouter).toMatchObject({
      pathname: '/page/2',
    });
  });
  test('after click the `prev button` should render prev page', async () => {
    const user = userEvent.setup();
    mockRouter.push('/page/2');
    renderWithProviders(<Pagination />);

    const buttonPrev = await screen.findByTestId('pagination-btn-prev');
    await user.click(buttonPrev);

    setTimeout(() => {
      expect(mockRouter).toMatchObject({
        pathname: '/page/1',
      });
    }, 500);
  });
});
