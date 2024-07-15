import { Status } from '@/types/types';
import classes from './header.module.css';
import { useContext, useRef } from 'react';
import { themeContext } from '@/context/themeContext';
import { ThemeToggle } from '../themeToggle/themeToggle';

type HeaderProps = {
  query: string;
  status: Status;
  handleSearch: () => void;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleQueryReset: () => void;
};

export default function Header(props: HeaderProps) {
  const { theme } = useContext(themeContext);
  const ref = useRef<HTMLInputElement>(null);
  const classSearchContainer =
    props.status === 'submitting' ? `${classes.searchContainer} ${classes.disabledElement}` : classes.searchContainer;

  return (
    <header className={classes.header} data-theme={theme}>
      <div className={classSearchContainer}>
        <form
          className={classes.inputContainer}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            props.handleSearch();
          }}
          role="search"
          data-testid="form-search"
        >
          <input
            name="search"
            data-testid="search-input"
            className={classes.input}
            onChange={props.handleQueryChange}
            value={props.query}
            placeholder="Search for the Star Trek episode"
            autoFocus
            ref={ref}
          ></input>
          {props.query.length > 0 && (
            <button
              data-testid="reset-btn"
              type="reset"
              className={classes.btnReset}
              onClick={() => {
                ref.current?.focus();
                props.handleQueryReset();
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
            props.handleSearch();
          }}
        >
          Search
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
