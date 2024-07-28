import { setupServer } from 'msw/node';
import { Pagination } from './pagination';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/mocks/utils/utils';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';

const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Pagination component', () => {
  test('should render Pagination component with control buttons and a page`s indicator', async () => {
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
    renderWithProviders(<Pagination />);

    const buttonNext = await screen.findByTestId('pagination-btn-next');
    const indicator = await screen.findByTestId('pagination-text-page');

    await user.click(buttonNext);
    const spinner = await screen.findByTestId('spinner-img');
    await waitForElementToBeRemoved(spinner);
    expect(screen.getByText(/A Moral Star, Part 1/i)).toBeInTheDocument();
    expect(indicator).toHaveTextContent(/2 \//i);
  });
  test('after click the `prev button` should render prev page', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Pagination />);

    const buttonPrev = await screen.findByTestId('pagination-btn-prev');
    const indicator = await screen.findByTestId('pagination-text-page');

    await user.click(buttonPrev);
    const spinner = await screen.queryByTestId('spinner-img');
    if (spinner) await waitForElementToBeRemoved(spinner);
    expect(screen.getByText(/Til Death Do Us Part/i)).toBeInTheDocument();
    expect(indicator).toHaveTextContent(/1 \//i);
  });
});
