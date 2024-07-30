import { Pagination } from '@/types/types';

export const ResponseKeys = ['headers', 'ok', 'status', 'statusText', 'type', 'url', 'redirected'];
export const EpisodeFullKeys = ['uid', 'title', 'series', 'season', 'usAirDate'];
export const EpisodeBaseKeys = ['uid', 'title', 'series', 'season', 'seasonNumber', 'episodeNumber', 'usAirDate'];
export const EpisodeBaseResponseKeys = ['page', 'sort', 'episodes'];
export const EpisodeFullResponseKeys = ['episode'];
export const BASE_URL = 'https://stapi.co/api';
export const paths = {
  episodeSearch: '/v1/rest/episode/search',
  episode: '/v1/rest/episode?uid=',
};
export const localStorageKey = 'K1vjGYuKHzp4ZI9Xsrgq';
export const APP_URL_ROOT_PROD = '/rsschool-react/';
export const PAGE_SIZE = 10;
export const initialPagination: Pagination = {
  pageNumber: 0,
  pageSize: 0,
  numberOfElements: 0,
  totalElements: 0,
  totalPages: 0,
  firstPage: true,
  lastPage: true,
};
export const FILE_ENDING = '_episodes.csv';
