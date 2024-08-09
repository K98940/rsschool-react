import { setupServer } from 'msw/node';
import { getEpisodes } from './getEpisodes';
import { isEpisodeBaseResponse } from '@/helpers/predicates';
import { handlers as detailsHandlers } from '@mocks/handlers/details';
import { handlers as episodesHandlers } from '@mocks/handlers/episodes';

const handlers = [...detailsHandlers, ...episodesHandlers];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Flyout component', async () => {
  test('', async () => {
    const response = await getEpisodes('1', '');

    expect(isEpisodeBaseResponse(response)).toBeTruthy();
  });
});
