import { useRef } from 'react';
import { Status } from '@/types/types';
import classes from './header.module.css';

type HeaderProps = {
  query: string;
  status: Status;
  handleSearch: () => void;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleQueryReset: () => void;
};

export default function Header(props: HeaderProps) {
  const ref = useRef<HTMLInputElement>(null);
  const classSearchContainer =
    props.status === 'submitting' ? `${classes.searchContainer} ${classes.disabledElement}` : classes.searchContainer;

  return (
    <header className={classes.header}>
      <div className={classSearchContainer}>
        <form
          className={classes.inputContainer}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            props.handleSearch();
          }}
        >
          <input
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
          className={classes.btnSearch}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            props.handleSearch();
          }}
        >
          Search
        </button>
      </div>
    </header>
  );
}
