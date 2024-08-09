import { setupServer } from 'msw/node';
import { getEpisode } from './getEpisode';
import { isEpisodeFullResponse } from '@/helpers/predicates';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';

const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Flyout component', async () => {
  test('', async () => {
    const response = await getEpisode('EPMA0000001002');

    expect(isEpisodeFullResponse(response)).toBeTruthy();
  });
});
