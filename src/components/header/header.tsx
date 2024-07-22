import classes from './header.module.css';
import { useNavigate } from 'react-router-dom';
import { APP_URL_ROOT } from '@/helpers/constants';
import { themeContext } from '@/context/themeContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ThemeToggle } from '../themeToggle/themeToggle';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { setQuery, selectQuery, selectStatus, fetchEpisodes } from '../episodes/episodesSlice';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery);
  const status = useAppSelector(selectStatus);
  const ref = useRef<HTMLInputElement>(null);
  const { theme } = useContext(themeContext);
  const [localstorage, setLocalstorage] = useLocalStorage();
  const classSearchContainer =
    status === 'submitting' ? `${classes.searchContainer} ${classes.disabledElement}` : classes.searchContainer;
  const [firstQuery] = useState(localstorage || query);

  const handleQueryReset = (): void => {
    dispatch(setQuery(''));
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setQuery(e.target.value));
  };

  const handleSearch = (): void => {
    setLocalstorage(query);
    dispatch(fetchEpisodes({ query }));
    navigate(APP_URL_ROOT);
  };

  useEffect(() => {
    dispatch(setQuery(localstorage));
  }, [localstorage, dispatch]);

  useEffect(() => {
    dispatch(fetchEpisodes({ query: firstQuery }));
  }, [firstQuery, dispatch]);

  return (
    <header className={classes.header} data-theme={theme} data-testid="app-header">
      <div className={classSearchContainer}>
        <form
          className={classes.inputContainer}
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
            value={query}
            placeholder="Search for the Star Trek episode"
            autoFocus
            ref={ref}
          ></input>
          {query.length > 0 && (
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
