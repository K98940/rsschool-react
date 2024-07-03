import './App.css';
import Api from '@api/api';
import Main from '@components/main/main';
import { Component, ReactNode } from 'react';
import Header from '@components/header/header';
import Spinner from '@components/spinner/spinner';
import { isAnimalBaseResponse } from '@helpers/predicates';
import { AppState, Status, SubmitEvents } from './types/types';
import ErrorBoundary from '@components/errorBoundary/errorBoundary';

const api = new Api();

class App extends Component {
  state: AppState = {
    status: 'idle',
    data: null,
  };

  updateStatus = (newStatus: Status): void => {
    this.setState((prevState) => ({ ...prevState, status: newStatus }));
  };

  handleSearch = (e: SubmitEvents, term: string): void => {
    e.preventDefault();
    console.log('search', term);
    if (this.state.status === 'submitting') return;
    this.updateStatus('submitting');
    api
      .searchAnimal(term)
      .then((resp) => {
        if (isAnimalBaseResponse(resp)) {
          this.setState((prevState) => ({ ...prevState, data: resp }));
        } else {
          console.log(`this is a bad response (code: ${resp.status}) `, resp.statusText);
        }
      })
      .catch(() => console.log('this is a network error'))
      .finally(() => {
        this.updateStatus('idle');
      });
  };

  componentDidUpdate(_: never, prevState: Readonly<AppState>): void {
    const cState = JSON.stringify(this.state.data);
    const pState = JSON.stringify(prevState.data);
    if (cState !== pState) {
      console.log('NEW STATE!', new Date().toLocaleTimeString());
    }
  }

  render(): ReactNode {
    return (
      <>
        <ErrorBoundary>
          {this.state.status === 'submitting' && <Spinner />}
          <Header handleSearch={this.handleSearch} status={this.state.status} />
          <Main data={this.state.data?.animals} />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
