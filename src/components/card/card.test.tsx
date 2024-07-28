import { Card } from './card';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '@/mocks/utils/utils';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';

const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Card component', () => {
  test('should render the list of episodes, after click on the list items and should render detail cards', async () => {
    renderWithProviders(<Card />);

    await screen.findByText(/Til Death Do Us Part/i);
    fireEvent.click(screen.getByText(/Til Death Do Us Part/i));
    expect(await screen.findByText(/Star Trek: Deep Space Nine/i)).toBeInTheDocument();
    expect(await screen.findByText(/DS9 Season 7/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/...But to Connect/i));
    expect(await screen.findByText(/Star Trek: Discovery/i)).toBeInTheDocument();
    expect(await screen.findByText(/DIS Season 4/i)).toBeInTheDocument();
  });
});
