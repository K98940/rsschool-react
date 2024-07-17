import { Main } from './main';
import { Provider } from 'react-redux';
import testStore from '../../store/testStore';
import { test_episode } from '@/helpers/constants';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';

describe('Main component', () => {
  it('shoud render NavElement with test data', async () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <Main />,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 1,
    });

    render(
      <Provider store={testStore}>
        <RouterProvider router={router} />
      </Provider>,
    );

    await waitFor(() => screen.getByTestId('episodes'));
    expect(screen.getByText(test_episode.title)).toBeInTheDocument();
  });
});
