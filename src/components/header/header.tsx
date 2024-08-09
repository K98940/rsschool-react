import classes from './header.module.css';
import { APP_URL_START } from '@/helpers/constants';
import { themeContext } from '@/context/themeContext';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ThemeToggle } from '../themeToggle/themeToggle';
import { useNavigate, useRouteError } from '@remix-run/react';
import { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const routeError = useRouteError();
  const ref = useRef<HTMLInputElement>(null);
  const { theme } = useContext(themeContext);
  const [localstorage, setLocalstorage] = useLocalStorage();
  const [term, setTerm] = useState('');

  const handleQueryReset = (): void => {
    setTerm('');
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTerm(e.target.value);
  };

  const handleSearch = (): void => {
    setLocalstorage(term);
    navigate({
      pathname: APP_URL_START,
      search: `?search=${term}`,
    });
  };

  useEffect(() => {
    if (routeError) return;
    setTerm(localstorage);
    navigate({
      pathname: APP_URL_START,
      search: `?search=${localstorage}`,
    });
  }, [localstorage, navigate, routeError]);

  return (
    <header
      className={`${classes.header} ${routeError ? classes.disabledElement : ''}`}
      data-theme={theme}
      data-testid="app-header"
    >
      <div className={classes.searchContainer}>
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
            value={term}
            placeholder="Search for the Star Trek episode"
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
