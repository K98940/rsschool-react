import { setupServer } from 'msw/node';
import mockRouter from 'next-router-mock';
import Pages from '@/pages/page/[pageNumber]';
import { screen } from '@testing-library/react';
import { EpisodeBaseResponse } from '@/types/types';
import data from '../../mocks/data/episodeBaseResponse0';
import { renderWithProviders } from '@/mocks/utils/utils';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';
import { afterAll, afterEach, beforeAll, describe, expect, test, vitest } from 'vitest';

const episodes = data as unknown as EpisodeBaseResponse;
const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
vitest.mock('next/router', () => require('next-router-mock'));

describe('pageNumber component', () => {
  test('should render pageNumber component', async () => {
    mockRouter.push('/');
    renderWithProviders(
      <>
        <Pages episodes={episodes} pageNumber={1} />
      </>,
    );

    expect(await screen.findByTestId('episodes')).toBeInTheDocument();
    expect(await screen.findByTestId('episodes-nav')).toBeInTheDocument();
    expect(await screen.findByText(/Til Death Do Us Part/i)).toBeInTheDocument();
    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    expect(checkboxes.length).toBe(10);
    const episodesLinks = await screen.findAllByRole('link');
    expect(episodesLinks.length).toBe(10);
    expect(await screen.findByTestId('pagination-container')).toBeInTheDocument();
  });
});
