import { AnimalBaseResponse } from '@/types/types';
import responseToJSON from '@/helpers/responseToJSON';
import { BASE_URL, paths } from '@/helpers/constants';

export default class Api {
  async searchAnimal(term: string, page: number = 0) {
    const search = `?pageNumber=${page}&pageSize=20`;
    const option = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${term}`,
    };
    return await fetch(`${BASE_URL}${paths.animal}${search}`, option).then(responseToJSON<AnimalBaseResponse>);
  }
}
