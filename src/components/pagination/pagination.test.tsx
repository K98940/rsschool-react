import Page from '~/routes/page.$page';
import { json } from '@remix-run/react';
import { EpisodeBaseResponse } from '@/types/types';
import { createRemixStub } from '@remix-run/testing';
import { render, screen } from '@testing-library/react';
import data from '../../mocks/data/episodeBaseResponse0';

const episodeBase: EpisodeBaseResponse = data as unknown as EpisodeBaseResponse;
const RemixStub = createRemixStub([
  {
    path: '/',
    Component: Page,
    loader() {
      return json({ episodesResponse: episodeBase, search: '', pathname: '', params: null });
    },
  },
]);

describe('Pagination component', () => {
  test('should render Pagination component with control buttons and a page`s indicator', async () => {
    render(<RemixStub />);

    const container = await screen.findByTestId('pagination-container');
    const indicator = await screen.findByTestId('pagination-text-page');
    const buttonPrev = await screen.findByTestId('pagination-link-prevPage');
    const buttonNext = await screen.findByTestId('pagination-link-nextPage');

    expect(container).toBeInTheDocument();
    expect(buttonPrev).toBeInTheDocument();
    expect(buttonNext).toBeInTheDocument();
    expect(indicator).toHaveTextContent(/1 \//i);
  });
});
