import { useEffect, useState } from 'react';
import { localStorageKey } from '@helpers/constants';

type Fun = (value: string) => void;
type T = [string, Fun];

function useLocalStorage(): T {
  const [value, setValue] = useState(getValue);

  useEffect(() => {
    setLocalStorage(value);
  }, [value]);

  function getValue() {
    if (typeof window !== 'undefined') return localStorage.getItem(localStorageKey) || '';
    return '';
  }

  function setLocalStorage(value: string): void {
    localStorage.setItem(localStorageKey, value);
  }

  return [value, setValue];
}

export default useLocalStorage;
