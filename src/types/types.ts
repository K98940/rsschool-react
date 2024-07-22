export type Status = 'idle' | 'submitting' | 'success' | 'failed';
export type AppState = {
  query: string;
  status: Status;
};
export type ResponsePage = {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
};
export type ResponseSortClause = {
  name: string;
  direction: 'ASC' | 'DESC';
  clauseOrder: number;
};
export type ResponseSort = {
  clauses: ResponseSortClause[];
};
export type Header = {
  uid: string;
  title: string;
};
export type EpisodeBase = {
  uid: string;
  title: string;
  titleGerman: string;
  titleItalian: string;
  titleJapanese: string;
  series: Header;
  season: Header;
  seasonNumber: number;
  episodeNumber: number;
  productionSerialNumber: number;
  featureLength: number;
  stardateFrom: number;
  stardateTo: number;
  yearFrom: number;
  yearTo: number;
  usAirDate: string;
  finalScriptDate: string;
};
export type EpisodeBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  episodes: EpisodeBase[];
};
export type EpisodeFull = {
  uid: string;
  title: string;
  series: {
    title: string;
  };
  season: {
    title: string;
  };
  usAirDate: string;
};
export type EpisodeFullResponse = {
  episode: EpisodeFull;
};
export type Pagination = {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
};

export type Details = {
  data: EpisodeFull;
  status: Status;
  error: string | null;
};
