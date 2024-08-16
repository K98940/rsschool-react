export type SortDirection = {
  direction: 'asc' | 'desc';
};

export type Errors = {
  name: string[];
  age: string[];
  email: string[];
  'password-1': string[];
  'password-2': string[];
  gender: string[];
  country: string[];
  terms: string[];
  upload: string[];
  [index: string]: string[];
};

export type List = { name: string; code: string };
