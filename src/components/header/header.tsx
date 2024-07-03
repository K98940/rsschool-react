import { Component, ReactNode } from 'react';
import classes from './header.module.css';
import { Status, SubmitEvents } from '@/types/types';
import DamageButton from '../damageButton/damageButton';

type HeaderProps = {
  status: Status;
  handleSearch: (e: SubmitEvents, term: string) => void;
};

export default class Header extends Component<HeaderProps> {
  state = {
    term: 'Albatross',
  };

  handleTermChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ ...this.state, term: e.target.value });
  };

  handleTermReset = (): void => {
    this.setState({ ...this.state, term: '' });
  };

  render(): ReactNode {
    const classSearchContainer =
      this.props.status === 'submitting'
        ? `${classes.searchContainer} ${classes.disabledElement}`
        : classes.searchContainer;

    return (
      <header className={classes.header}>
        <div className={classSearchContainer}>
          <DamageButton text="Do Damage" />
          <form className={classes.inputContainer} onSubmit={(e) => this.props.handleSearch(e, this.state.term)}>
            <input
              className={classes.input}
              onChange={this.handleTermChange}
              value={this.state.term}
              placeholder="search animal"
            ></input>
            {this.state.term.length > 0 && (
              <button type="reset" className={classes.btnReset} onClick={this.handleTermReset}>
                x
              </button>
            )}
          </form>
          <button className={classes.btnSearch} onClick={(e) => this.props.handleSearch(e, this.state.term)}>
            Search
          </button>
        </div>
      </header>
    );
  }
}
