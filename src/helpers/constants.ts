import { AppState } from '@/types/types';

export const ResponseKeys = ['headers', 'ok', 'status', 'statusText', 'type', 'url', 'redirected'];
export const EpisodeBaseResponseKeys = ['page', 'sort', 'episodes'];
export const EpisodeFullResponseKeys = ['episode'];
export const BASE_URL = 'https://stapi.co/api';
export const paths = {
  episodeSearch: '/v1/rest/episode/search',
  episode: '/v1/rest/episode',
};
export const localStorageKey = 'K1vjGYuKHzp4ZI9Xsrgq';
export const initialState: AppState = {
  query: '',
  status: 'idle',
  data: null,
};
export const APP_URL_EPISODE = 'episode/';
export const APP_URL_ROOT = '/rsschool-react/';
export const PAGE_SIZE = 10;
