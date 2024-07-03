export type SubmitEvents = React.MouseEvent | React.FormEvent;
export type Status = 'idle' | 'submitting' | 'success';
export type AppState = {
  status: Status;
  data: AnimalBaseResponse | null;
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

export type AnimalBase = {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
};

export type AnimalBaseResponse = {
  page: ResponsePage;
  sort: ResponseSort;
  animals: AnimalBase[];
};
