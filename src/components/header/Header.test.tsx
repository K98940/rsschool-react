import RootLayout from '@/app/layout';
import { setupServer } from 'msw/node';
import CardEmpty from '../cardEmpty/cardEmpty';
import { render, screen } from '@testing-library/react';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';
import { afterAll, afterEach, beforeAll, describe, expect, test, vitest } from 'vitest';

const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => {
  vitest.mock(import('next/navigation'), async (importOriginal) => {
    const mod = await importOriginal();
    return {
      ...mod,
      useRouter: vitest.fn(),
    };
  });
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Header component', () => {
  test('should render Header component with: search input, search button, theme toggle button', async () => {
    render(<RootLayout children={<CardEmpty />} />);

    const header = await screen.findByTestId('app-header');
    const searchInput = await screen.findByTestId('search-input');
    const searchButton = await screen.findByTestId('search-btn');
    const themeToggleButton = await screen.findByTestId('button-theme-toggle');

    expect(header).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(themeToggleButton).toBeInTheDocument();
  });
});
