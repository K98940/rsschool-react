import { EpisodeFullResponse } from '@/types/types';
import Card from './card';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';

const fakeResponse: EpisodeFullResponse = {
  episode: {
    season: {
      title: 'test season',
    },
    series: {
      title: 'test series',
    },
    title: 'test title',
    uid: 'test uid',
    usAirDate: 'test date',
  },
};
const badResponse = null;

describe('Card component', () => {
  it('should render test data', async () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <Card />,
        loader: () => fakeResponse,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.queryByRole('heading'));
    expect(screen.getByRole('banner')).toHaveTextContent(fakeResponse.episode.title);
    expect(screen.getByTestId('card-season')).toHaveTextContent(fakeResponse.episode.season.title);
    expect(screen.getByTestId('card-series')).toHaveTextContent(fakeResponse.episode.series.title);
    expect(screen.getByTestId('card-date')).toHaveTextContent(fakeResponse.episode.usAirDate);
  });

  it('should not render card if no data', async () => {
    const routes: RouteObject[] = [
      {
        path: '/',
        element: <Card />,
        loader: () => badResponse,
      },
    ];
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.queryByTestId('cardempty-header'));
    expect(screen.queryByTestId('card-season')).not.toBeInTheDocument();
  });
});
