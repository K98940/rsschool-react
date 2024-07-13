import responseToJSON from '@/helpers/responseToJSON';
import { BASE_URL, PAGE_SIZE, paths } from '@/helpers/constants';
import { EpisodeBaseResponse, EpisodeFullResponse } from '@/types/types';

export default {
  async searchEpisodes(search: string, page: number = 0) {
    const query = `?pageNumber=${page}&pageSize=${PAGE_SIZE}`;
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `title=${search}`,
    };
    const response = await fetch(`${BASE_URL}${paths.episodeSearch}${query}`, option);
    return responseToJSON<EpisodeBaseResponse>(response);
  },
  async getEpisode(uid: string) {
    const query = `?uid=${uid}`;
    const response = await fetch(`${BASE_URL}${paths.episode}${query}`);
    return responseToJSON<EpisodeFullResponse>(response);
  },
};
