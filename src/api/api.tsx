import { ls } from '@/helpers/localStorage';
import { EpisodeBaseResponse } from '@/types/types';
import responseToJSON from '@/helpers/responseToJSON';
import { BASE_URL, paths } from '@/helpers/constants';

export default class Api {
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
    return await fetch(`${BASE_URL}${paths.episode}${query}`, option).then(responseToJSON<EpisodeBaseResponse>);
  }
}
