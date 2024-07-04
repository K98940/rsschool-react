import { AppState } from '@/types/types';

export const ResponseKeys = ['headers', 'ok', 'status', 'statusText', 'type', 'url', 'redirected'];
export const EpisodeBaseResponseKeys = ['page', 'sort', 'episodes'];
export const BASE_URL = 'https://stapi.co/api';
export const paths = {
  episode: '/v1/rest/episode/search',
};
export const localStorageKey = 'K1vjGYuKHzp4ZI9Xsrgq';
export const initialState: AppState = {
  query: '',
  status: 'idle',
  data: null,
};
