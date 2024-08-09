import { setupServer } from 'msw/node';
import { EpisodeFullResponse } from '@/types/types';
import { render, screen } from '@testing-library/react';
import data from '../src/mocks/data/episodeFullResponse0';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';
import PageEpisode, { loader } from '~/routes/page.$page.episode.$episode';

const episodeFullResponse = data[0] as unknown as EpisodeFullResponse;
const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const episode = 'EPMA0000001002';
const dataResponse = {
  search: '?search=',
  pathname: `/page/1/episode/${episode}`,
  params: { episode, page: '1' },
};
const request = new Request(`http://localhost/page/1/episode/${episode}?search=one`);
const params = { episode, page: '1' };

describe('Episode Loader must return correct object', () => {
  it('should return a response', async () => {
    const response = await loader({
      request: new Request(request),
      params,
      context: {},
    });

    expect(response.params).toEqual(dataResponse.params);
    expect(response.pathname).toEqual(dataResponse.pathname);
    expect(response.search).toBe('one');
    expect(response.episodeResponse).toEqual(episodeFullResponse);
  });

  it('should render Episode route', async () => {
    const routes = [
      {
        path: '/page/1',
        element: <PageEpisode />,
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

    const seasonContent = await screen.findByTestId('card-season');
    expect(seasonContent).toHaveTextContent(/DS9 Season 7/i);
    const seriesContent = await screen.findByTestId('card-series');
    expect(seriesContent).toHaveTextContent(/Star Trek: Deep Space Nine/i);
    const dateContent = await screen.findByTestId('card-date');
    expect(dateContent).toHaveTextContent(/1999-04-14/i);
    const buttonClose = await screen.findByTestId('card-button-close');
    expect(buttonClose).toHaveTextContent(/Close/i);
  });
});
