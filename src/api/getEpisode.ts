import { EpisodeFullResponse } from '@/types/types';
import { BASE_URL, paths } from '@/helpers/constants';

const getEpisode = async (episodeId: string) => {
  const url = `${BASE_URL}${paths.episode}${episodeId}`;
  try {
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`
    Failed to fetch episode's details ${url}
    because ${res.statusText}
    code: ${res.status}
    `);
    return res.json() as unknown as EpisodeFullResponse;
  } catch (error) {
    console.log('getEpisode -> catch error: ', error);
  }
};

export { getEpisode };
