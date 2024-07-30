import Header from './header';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/mocks/utils/utils';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';
import { afterAll, afterEach, beforeAll, describe, expect, test, vitest } from 'vitest';

const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
vitest.mock('next/router', () => require('next-router-mock'));

describe('Header component', () => {
  test('should render Header component with: search input, search button, theme toggle button', async () => {
    renderWithProviders(<Header />);
    const header = await screen.findByTestId('app-header');
    const searchInput = await screen.findByTestId('search-input');
    const searchButton = await screen.findByTestId('search-btn');
    const themeToggleButton = await screen.findByTestId('button-theme-toggle');

    expect(header).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(themeToggleButton).toBeInTheDocument();
  });
  test('after text in the search input should appears reset button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    const searchInput = await screen.findByTestId('search-input');

    await user.type(searchInput, 'test');
    const resetButton = await screen.findByTestId('reset-btn');
    expect(resetButton).toBeInTheDocument();
  });
  test('after delete text in the search input should vanish the reset button', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    const searchInput = await screen.findByTestId('search-input');

    await user.type(searchInput, 'test');
    const resetButton = await screen.findByTestId('reset-btn');
    await user.click(resetButton);
    expect(resetButton).not.toBeInTheDocument();
  });
});
