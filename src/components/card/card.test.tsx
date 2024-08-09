import { json } from '@remix-run/react';
import { EpisodeFullResponse } from '@/types/types';
import { createRemixStub } from '@remix-run/testing';
import data from '../../mocks/data/episodeFullResponse0';
import PageEpisode from '~/routes/page.$page.episode.$episode';
import { render, screen, waitFor } from '@testing-library/react';

const episodeFull: EpisodeFullResponse = data[0] as unknown as EpisodeFullResponse;

describe('Card component', async () => {
  test('should render Card component with data', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: PageEpisode,
        loader() {
          return json({ episodeResponse: episodeFull, params: null, search: '' });
        },
      },
    ]);

    render(<RemixStub />);

    await waitFor(() => screen.findByText(/Til Death Do Us Part/i));
    await waitFor(() => screen.findByText(/DS9 Season 7/i));
    await waitFor(() => screen.findByText(/Star Trek: Deep Space Nine/i));
    await waitFor(() => screen.findByText(/Close/i));
  });
});
