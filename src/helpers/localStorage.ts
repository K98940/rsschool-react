import { localStorageKey } from '@helpers/constants';

export const ls = {
  save(data: string): void {
    localStorage.setItem(localStorageKey, data);
  },
  get(): string | null {
    return localStorage.getItem(localStorageKey);
  },
};
