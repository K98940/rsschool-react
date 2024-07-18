import { AppState, EpisodeBase, Pagination } from '@/types/types';

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
};
export const APP_URL_EPISODE = 'episode/';
export const APP_URL_ROOT = '/';
export const APP_URL_ROOT_PROD = '/rsschool-react/';
export const PAGE_SIZE = 10;
export const test_episode: EpisodeBase = {
  episodeNumber: 1,
  featureLength: 2,
  finalScriptDate: '2024',
  productionSerialNumber: 123450,
  season: {
    title: 'sdfsdf',
    uid: '345345',
  },
  seasonNumber: 456,
  series: {
    title: 'fgjghj',
    uid: '678789',
  },
  stardateFrom: 2,
  stardateTo: 3,
  title: 'test episode title',
  titleGerman: 'dfg',
  titleItalian: 'ghj',
  titleJapanese: 'hjk',
  uid: '65868j',
  usAirDate: 'ghjfh',
  yearFrom: 3,
  yearTo: 55,
};
export const initialPagination: Pagination = {
  pageNumber: 0,
  pageSize: 0,
  numberOfElements: 0,
  totalElements: 0,
  totalPages: 0,
  firstPage: true,
  lastPage: true,
};
