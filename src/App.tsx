import './App.css';
import Api from '@api/api';
import Main from '@components/main/main';
import { ls } from './helpers/localStorage';
import { Component, ReactNode } from 'react';
import Header from '@components/header/header';
import { AppState, Status } from './types/types';
import Spinner from '@components/spinner/spinner';
import { initialState } from '@/helpers/constants';
import { isEpisodeBaseResponse } from '@helpers/predicates';
import ErrorBoundary from '@components/errorBoundary/errorBoundary';

const api = new Api();

class App extends Component {
  localStorageData: string | null = '';
  state: AppState = initialState;

  updateStatus = (newStatus: Status): void => {
    this.setState((prevState) => ({ ...prevState, status: newStatus }));
  };

  handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ ...this.state, query: e.target.value });
  };

  handleSearch = (): void => {
    if (this.state.status === 'submitting') return;
    this.getData(this.state.query);
  };

  handleQueryReset = (): void => {
    this.setState((prevState) => ({ ...prevState, query: '' }));
  };

  getData(term: string) {
    this.updateStatus('submitting');
    api
      .searchEpisode(term.trim())
      .then((resp) => {
        if (isEpisodeBaseResponse(resp)) {
          this.setState((prevState) => ({ ...prevState, data: resp }));
        } else {
          console.log(`this is a bad response (code: ${resp.status}) `, resp.statusText);
        }
      })
      .catch(() => console.log('this is a network error'))
      .finally(() => {
        this.updateStatus('idle');
      });
  }

  componentDidMount(): void {
    const localStorageData = ls.get();
    if (localStorageData) {
      this.setState((prevState) => ({ ...prevState, query: localStorageData }));
      this.getData(localStorageData);
    }
  }

  render(): ReactNode {
    return (
      <>
        <ErrorBoundary>
          {this.state.status === 'submitting' && <Spinner />}
          <Header
            query={this.state.query}
            handleSearch={this.handleSearch}
            handleQueryChange={this.handleQueryChange}
            handleQueryReset={this.handleQueryReset}
            status={this.state.status}
          />
          <Main data={this.state.data?.episodes} />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
