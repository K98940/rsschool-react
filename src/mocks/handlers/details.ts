import { http, HttpResponse } from 'msw';
import episodeFullResponse0 from '../data/episodeFullResponse0';

type GetEpisodeParam = {
  uid: string;
};
type EpisideRequest = {
  request: Request;
};

const getEpisodeResolver = ({ request }: EpisideRequest) => {
  const url = new URL(request.url);
  const uid = url.searchParams.get('uid');
  if (!uid) {
    return new HttpResponse(null, { status: 404 });
  }
  switch (uid) {
    case 'EPMA0000001002':
      return HttpResponse.json(episodeFullResponse0[0]);
      break;
    case 'EPMA0000275161':
      return HttpResponse.json(episodeFullResponse0[1]);
      break;

    default:
      return new HttpResponse(null, { status: 404 });
      break;
  }
};

export const handlers = [http.get<GetEpisodeParam>('https://stapi.co/api/v1/rest/episode', getEpisodeResolver)];
