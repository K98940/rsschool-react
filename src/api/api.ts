import { ls } from '@/helpers/localStorage';
import responseToJSON from '@/helpers/responseToJSON';
import { BASE_URL, paths } from '@/helpers/constants';
import { EpisodeBaseResponse, EpisodeFullResponse } from '@/types/types';

export default {
  async searchEpisode(search: string, page: number = 0) {
    const query = `?pageNumber=${page}&pageSize=20`;
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `title=${search}`,
    };
    ls.save(search);
    const response = await fetch(`${BASE_URL}${paths.episodeSearch}${query}`, option);
    return responseToJSON<EpisodeBaseResponse>(response);
  },
  async getEpisode(uid: string) {
    const query = `?uid=${uid}`;
    const response = await fetch(`${BASE_URL}${paths.episode}${query}`);
    return responseToJSON<EpisodeFullResponse>(response);
  },
};
