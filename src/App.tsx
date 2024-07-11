import './App.css';
import api from './api/api';
import { Status } from './types/types';
import { ls } from './helpers/localStorage';
import { Main } from '@components/main/main';
import Header from '@components/header/header';
import Spinner from '@components/spinner/spinner';
import { initialState } from '@/helpers/constants';
import { useCallback, useEffect, useState } from 'react';
import { isEpisodeBaseResponse } from '@helpers/predicates';
import ErrorBoundary from '@components/errorBoundary/errorBoundary';

export default function App() {
  const [state, setState] = useState(initialState);

  const updateStatus = (newStatus: Status): void => {
    setState((prevState) => ({ ...prevState, status: newStatus }));
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, query: e.target.value });
  };

  const handleSearch = (): void => {
    if (state.status === 'submitting') return;
    window.location.href = '/';
    getData(state.query);
  };

  const handleQueryReset = (): void => {
    setState((prevState) => ({ ...prevState, query: '' }));
  };

  const getData = useCallback((term: string) => {
    updateStatus('submitting');
    api
      .searchEpisode(term.trim())
      .then((resp) => {
        if (isEpisodeBaseResponse(resp)) {
          setState((prevState) => ({ ...prevState, data: resp }));
        } else {
          console.log(`this is a bad response (code: ${resp.status}) `, resp.statusText);
        }
      })
      .catch(() => console.log('this is a network error'))
      .finally(() => {
        updateStatus('idle');
      });
  }, []);

  useEffect(() => {
    const term = ls.get();
    term && setState((prevState) => ({ ...prevState, query: term }));
    getData(term || '');
  }, [getData]);

  return (
    <>
      <ErrorBoundary>
        {state.status === 'submitting' && <Spinner />}
        <Header
          query={state.query}
          handleSearch={handleSearch}
          handleQueryChange={handleQueryChange}
          handleQueryReset={handleQueryReset}
          status={state.status}
        />
        <Main episodes={state.data?.episodes} />
      </ErrorBoundary>
    </>
  );
}
