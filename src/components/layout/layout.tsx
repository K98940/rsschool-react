import api from '@/api/api';
import { Main } from '../main/main';
import Header from '../header/header';
import { Status } from '@/types/types';
import Spinner from '../spinner/spinner';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useCallback, useEffect, useState } from 'react';
import { isEpisodeBaseResponse } from '@/helpers/predicates';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { APP_URL_ROOT, initialState } from '@/helpers/constants';

export const Layout = () => {
  const [state, setState] = useState(initialState);
  const [page, setPage] = useState(0);
  const [localstorage, setLocalstorage] = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams('');
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
    setSearchParams({ search: state.query });
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
    const search = searchParams.get('search') || localstorage;
    setState((prevState) => ({ ...prevState, query: search }));
    getData(search);
  }, [getData, localstorage, searchParams]);

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
