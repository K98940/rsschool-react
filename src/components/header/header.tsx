import classes from './header.module.css';
import { useNavigate } from 'react-router-dom';
import { APP_URL_ROOT } from '@/helpers/constants';
import { useGetEpisodesQuery } from '@/api/apiSlice';
import { themeContext } from '@/context/themeContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ThemeToggle } from '../themeToggle/themeToggle';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setQuery, selectQuery, setPage } from '../episodes/episodesSlice';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const { theme } = useContext(themeContext);
  const [localstorage, setLocalstorage] = useLocalStorage();
  const query = useAppSelector(selectQuery);
  const [term, setTerm] = useState(query);
  const { isFetching } = useGetEpisodesQuery({ query, pageNumber: 0 });

  const handleQueryReset = (): void => {
    setTerm('');
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTerm(e.target.value);
  };

  const handleSearch = (): void => {
    dispatch(setQuery(term));
    dispatch(setPage(0));
    setLocalstorage(term);
    navigate(APP_URL_ROOT);
  };

  useEffect(() => {
    dispatch(setQuery(localstorage));
    setTerm(localstorage);
  }, [localstorage, dispatch]);

  return (
    <header className={classes.header} data-theme={theme} data-testid="app-header">
      <div className={classes.searchContainer}>
        <form
          className={`${classes.inputContainer} ${isFetching ? classes.disabledElement : ''}`}
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
