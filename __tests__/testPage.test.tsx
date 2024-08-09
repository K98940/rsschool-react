import { setupServer } from 'msw/node';
import Page, { loader } from '~/routes/page.$page';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';
import data from '../src/mocks/data/episodeBaseResponse0';
import { EpisodeBaseResponse } from '@/types/types';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

const episodeBaseResponse = data as unknown as EpisodeBaseResponse;
const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const dataResponse = {
  search: '?search=',
  pathname: '/page/1/episode/12345678',
  params: { episode: '12345678', page: '1' },
};
const request = new Request('http://localhost/page/1/episode/12345678?search=one');
const params = { episode: '12345678', page: '1' };

describe('Page Loader must return correct object', () => {
  it('should return a response', async () => {
    const response = await loader({
      request: new Request(request),
      params,
      context: {},
    });

    expect(response.params).toEqual(dataResponse.params);
    expect(response.pathname).toEqual(dataResponse.pathname);
    expect(response.search).toBe('one');
    expect(response.episodesResponse).toEqual(episodeBaseResponse);
  });

  it('should render Page', async () => {
    const routes = [
      {
        path: '/page/1',
        element: <Page />,
        loader: () =>
          loader({
            request: new Request(request),
            params,
            context: {},
          }),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/page/1'],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByTestId('episodes-nav'));
    await waitFor(() => screen.getByTestId('episodes'));
    await waitFor(() => screen.getByTestId('episodes-nav'));
    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    expect(checkboxes.length).toBe(10);
    const navLinks = await screen.findAllByRole('link');
    expect(navLinks.length).toBeGreaterThan(11);
    await screen.findByTestId('pagination-container');
    await screen.findByTestId('pagination-link-prevPage');
    await screen.findByTestId('pagination-text-page');
    await screen.findByTestId('pagination-link-nextPage');
    const message = await screen.findByRole('paragraph');
    expect(message).toHaveTextContent(/Select an episode/i);
  });
});
