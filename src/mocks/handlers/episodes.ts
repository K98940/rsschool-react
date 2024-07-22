import { delay, http, HttpResponse } from 'msw';
import episodeBaseResponse0 from '../data/episodeBaseResponse0';
import episodeBaseResponse1 from '../data/episodeBaseResponse1';

type EpisideRequest = {
  request: Request;
};

const getEpisodesResolver = async ({ request }: EpisideRequest) => {
  await delay(50);
  const url = new URL(request.url);
  const pageNumber = url.searchParams.get('pageNumber');
  if (!pageNumber) {
    return new HttpResponse(null, { status: 404 });
  }
  switch (pageNumber) {
    case '0':
      return HttpResponse.json(episodeBaseResponse0);
      break;
    case '1':
      return HttpResponse.json(episodeBaseResponse1);
      break;

    default:
      return new HttpResponse(null, { status: 404 });
      break;
  }
};

export const handlers = [http.post('https://stapi.co/api/v1/rest/episode/search', getEpisodesResolver)];
