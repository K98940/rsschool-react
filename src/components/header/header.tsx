'use client';
import classes from './header.module.css';
import { makeHref } from '@/helpers/makeHref';
import { Params, SearchParams } from '@/types/types';
import { themeContext } from '@/context/themeContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useParams, useRouter } from 'next/navigation';
import { ThemeToggle } from '../themeToggle/themeToggle';
import { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';

export default function Header() {
  const router = useRouter();

  const params = useParams<Params>();
  const ref = useRef<HTMLInputElement>(null);
  const [term, setTerm] = useState('');
  const [localstorage, setLocalstorage] = useLocalStorage();
  const { theme } = useContext(themeContext);
  const searchParams: SearchParams = { search: term };
  const href = makeHref({ pageNumber: 1, params, searchParams });

  const handleQueryReset = (): void => {
    setTerm('');
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTerm(e.target.value);
  };

  const handleSearch = useCallback(() => {
    setLocalstorage(term);
    router.push(href);
  }, [term, setLocalstorage, router, href]);

  useEffect(() => {
    setTerm(localstorage);
  }, [localstorage]);

  return (
    <header className={classes.header} data-theme={theme} data-testid="app-header">
      <div className={classes.searchContainer}>
        <form
          className={`${classes.inputContainer}`}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSearch();
          }}
          role="search"
          data-testid="form-search"
        >
          <input
            name="search"
            data-testid="search-input"
            className={classes.input}
            onChange={handleQueryChange}
            value={term}
            placeholder="Search for the Star Trek episode"
            autoFocus
            ref={ref}
          ></input>
          {term.length > 0 && (
            <button
              data-testid="reset-btn"
              type="reset"
              className={classes.btnReset}
              onClick={() => {
                ref.current?.focus();
                handleQueryReset();
              }}
            >
              x
            </button>
          )}
        </form>
        <button
          data-testid="search-btn"
          className={`button ${classes.btnSearch}`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          Search
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
