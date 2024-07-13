import api from '@/api/api';
import { Main } from '../main/main';
import Header from '../header/header';
import { Status } from '@/types/types';
import Spinner from '../spinner/spinner';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '@/hooks/useLocalStorage';
import { APP_URL_ROOT, initialState } from '@/helpers/constants';
import { useCallback, useEffect, useState } from 'react';
import { isEpisodeBaseResponse } from '@/helpers/predicates';

export const Layout = () => {
  const [state, setState] = useState(initialState);
  const [page, setPage] = useState(0);
  const [localstorage, setLocalstorage] = useLocalStorage();
  const navigate = useNavigate();

  const handleChangePage = (page: number): void => {
    setPage(page);
  };

  const updateStatus = (newStatus: Status): void => {
    setState((prevState) => ({ ...prevState, status: newStatus }));
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, query: e.target.value });
  };

  const handleSearch = (): void => {
    if (state.status === 'submitting') return;
    setPage(0);
    getData(state.query);
    setLocalstorage(state.query);
    navigate(APP_URL_ROOT);
  };

  const handleQueryReset = (): void => {
    setState((prevState) => ({ ...prevState, query: '' }));
  };

  const getData = useCallback(
    (term: string) => {
      updateStatus('submitting');
      api
        .searchEpisodes(term.trim(), page)
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
    },
    [page],
  );

  useEffect(() => {
    localstorage && setState((prevState) => ({ ...prevState, query: localstorage }));
    getData(localstorage || '');
  }, [getData, localstorage]);

  return (
    <>
      {state.status === 'submitting' && <Spinner />}
      <Header
        query={state.query}
        handleSearch={handleSearch}
        handleQueryChange={handleQueryChange}
        handleQueryReset={handleQueryReset}
        status={state.status}
      />
      <Main data={state.data} handleChangePage={handleChangePage} />
    </>
  );
};
