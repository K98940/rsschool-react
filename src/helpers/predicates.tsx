type ResponsePage = {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
};

type ResponseSortClause = {
  name: string;
  direction: 'ASC' | 'DESC';
  clauseOrder: number;
};

type ResponseSort = {
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

const ResponseKeys = ['headers', 'ok', 'status', 'statusText', 'type', 'url', 'redirected'];
const AnimalBaseResponseKeys = ['page', 'sort', 'animals'];

export function isResponse(data: unknown | Response): data is Response {
  if (typeof data !== 'object') return false;
  return ResponseKeys.every((key) => key in (data as Response));
}
export function isAnimalBaseResponse(data: unknown | AnimalBaseResponse): data is AnimalBaseResponse {
  if (typeof data !== 'object') return false;
  return AnimalBaseResponseKeys.every((key) => key in (data as AnimalBaseResponse));
}
