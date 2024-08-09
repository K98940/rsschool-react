import { EpisodeBaseResponse } from '@/types/types';
import { BASE_URL, PAGE_SIZE, paths } from '@/helpers/constants';

const getEpisodes = async (page: string, query: string): Promise<EpisodeBaseResponse> => {
  const pageNumber = Number(page) ? Number(page) - 1 : 0;
  const url = `${BASE_URL}${paths.episodeSearch}?pageNumber=${pageNumber}&pageSize=${PAGE_SIZE}`;

  const res = await fetch(url, {
    method: 'POST',
    body: `title=${query}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (!res.ok)
    throw new Error(`
    Failed to fetch list of episodes ${url},
    because ${res.statusText},
    status: ${res.status}
    `);
  return res.json() as unknown as EpisodeBaseResponse;
};

export { getEpisodes };
