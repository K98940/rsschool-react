import { Episodes } from './episodes';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';

const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => {
  vi.mock('next/router', () => require('next-router-mock'));
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

vitest.mock(import('next/navigation'), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: vitest.fn(),
  };
});

const searchParams: { [key: string]: string | string[] | undefined } = { search: '' };
const params: {
  page: string;
  episode: string;
} = { page: '1', episode: '' };

describe('Episodes component', async () => {
  test('must render nav element', async () => {
    const episodesTSX = await Episodes({ params, searchParams });
    render(episodesTSX);

    expect(await screen.findByTestId('episodes-nav')).toBeInTheDocument();
  });
  test('must render 10 checkboxes', async () => {
    const episodesTSX = await Episodes({ params, searchParams });
    render(episodesTSX);

    const checkboxes = await screen.findAllByTestId('episode-checkbox');
    expect(checkboxes.length).toBe(10);
  });
  test('must render pagination', async () => {
    const episodesTSX = await Episodes({ params, searchParams });
    render(episodesTSX);

    expect(await screen.findByTestId('pagination-container')).toBeInTheDocument();
  });
});
