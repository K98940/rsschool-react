import { Main } from './main';
import { test_episode } from '@/helpers/constants';
import { EpisodeBaseResponse } from '@/types/types';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';

const onChange = vi.fn(() => 'onChange');
const data: EpisodeBaseResponse | null = {
  episodes: [test_episode],
  page: {
    firstPage: true,
    lastPage: false,
    numberOfElements: 2,
    pageNumber: 0,
    pageSize: 2,
    totalElements: 2,
    totalPages: 1,
  },
  sort: {
    clauses: [],
  },
};

describe('Main component', () => {
  it('shoud render NavElement with test data', async () => {
    const FAKE_EVENT = { name: 'test event' };
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <Main data={data} handleChangePage={onChange} />,
        loader: () => FAKE_EVENT,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 1,
    });
    render(<RouterProvider router={router} />);
    await waitFor(() => screen.getByTestId('episodes'));
    expect(screen.getByText(test_episode.title)).toBeInTheDocument();
  });
});
