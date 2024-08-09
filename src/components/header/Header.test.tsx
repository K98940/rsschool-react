import Header from './header';
import { APP_URL_START } from '@/helpers/constants';
import { userEvent } from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

const routes = [
  {
    path: APP_URL_START,
    element: <Header />,
    loader: () => 5,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ['/', APP_URL_START],
  initialIndex: 1,
});

describe('Header component', () => {
  test('should render Header component with: search input, search button, theme toggle button', async () => {
    render(<RouterProvider router={router} />);

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
    render(<RouterProvider router={router} />);

    const searchInput = await screen.findByTestId('search-input');
    await user.type(searchInput, 'test');
    const resetButton = await screen.findByTestId('reset-btn');
    expect(resetButton).toBeInTheDocument();
  });
  test('after delete text in the search input should vanish the reset button', async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    const searchInput = await screen.findByTestId('search-input');
    await user.type(searchInput, 'test');
    const resetButton = await screen.findByTestId('reset-btn');
    await user.click(resetButton);
    expect(resetButton).not.toBeInTheDocument();
  });
});
