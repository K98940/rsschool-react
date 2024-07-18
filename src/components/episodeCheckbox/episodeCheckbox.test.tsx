import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { EpisodeCheckbox } from './episodeCheckbox';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import testStore from '@/store/testStore';
import userEvent from '@testing-library/user-event';

describe('EpisodeCheckbox component', () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <EpisodeCheckbox id="65868j" />,
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    initialIndex: 1,
  });

  it('shoud render EpisodeCheckbox', async () => {
    render(
      <Provider store={testStore}>
        <RouterProvider router={router} />
      </Provider>,
    );

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('shoud have attribute `checked`', async () => {
    render(
      <Provider store={testStore}>
        <RouterProvider router={router} />
      </Provider>,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('shoud change attribute `checked` after click', async () => {
    render(
      <Provider store={testStore}>
        <RouterProvider router={router} />
      </Provider>,
    );
    const user = userEvent.setup();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
