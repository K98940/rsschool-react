export type SubmitEvents = React.MouseEvent | React.FormEvent;
export type Status = 'idle' | 'submitting' | 'success';
export type AppState = {
  query: string;
  status: Status;
  data: EpisodeBaseResponse | null;
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
