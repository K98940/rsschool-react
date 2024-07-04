import { Status } from '@/types/types';
import classes from './header.module.css';
import { Component, createRef, ReactNode } from 'react';
import DamageButton from '../damageButton/damageButton';

type HeaderProps = {
  query: string;
  status: Status;
  handleSearch: () => void;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleQueryReset: () => void;
};

export default class Header extends Component<HeaderProps> {
  private readonly ref = createRef<HTMLInputElement>();

  render(): ReactNode {
    const classSearchContainer =
      this.props.status === 'submitting'
        ? `${classes.searchContainer} ${classes.disabledElement}`
        : classes.searchContainer;

    return (
      <header className={classes.header}>
        <div className={classSearchContainer}>
          <DamageButton text="Do Damage" />
          <form
            className={classes.inputContainer}
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              this.props.handleSearch();
            }}
          >
            <input
              className={classes.input}
              onChange={this.props.handleQueryChange}
              value={this.props.query}
              placeholder="Search for the Star Trek episode"
              autoFocus
              ref={this.ref}
            ></input>
            {this.props.query.length > 0 && (
              <button
                type="reset"
                className={classes.btnReset}
                onClick={() => {
                  this.ref.current?.focus();
                  this.props.handleQueryReset();
                }}
              >
                x
              </button>
            )}
          </form>
          <button
            className={classes.btnSearch}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              this.props.handleSearch();
            }}
          >
            Search
          </button>
        </div>
      </header>
    );
  }
}
