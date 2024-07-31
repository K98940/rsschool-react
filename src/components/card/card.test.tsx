import { Card } from './card';
import { setupServer } from 'msw/node';
import mockRouter from 'next-router-mock';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/mocks/utils/utils';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
import data from '../../mocks/data/episodeFullResponse0';
import { EpisodeFullResponse } from '@/types/types';

const episode = data[0] as unknown as EpisodeFullResponse;
const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Card component', () => {
  test('should render the Details of episode', async () => {
    mockRouter.query = { pageNumber: '1', id: 'EPMA0000001002' };

    renderWithProviders(<Card episode={episode.episode} />);

    const title = await screen.findByText(/Til Death Do Us Part/i);
    const season = await screen.findByText(/DS9 Season 7/i);
    const series = await screen.findByText(/Deep Space Nine/i);
    const date = await screen.findByText(/1999-04-14/i);
    const buttonClose = await screen.findByRole('button');

    expect(title).toBeInTheDocument();
    expect(season).toBeInTheDocument();
    expect(series).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(buttonClose).toHaveClass(/btnCloseCard/i);
    expect(buttonClose).toHaveTextContent(/close/i);
  });
});
