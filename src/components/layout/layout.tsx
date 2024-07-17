import api from '@/api/api';
import { Main } from '../main/main';
import Header from '../header/header';
import { Status } from '@/types/types';
import Spinner from '../spinner/spinner';
import { useDispatch } from 'react-redux';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useCallback, useEffect, useState } from 'react';
import { updateEpisodes } from '../episodes/episodesSlice';
import { isEpisodeBaseResponse } from '@/helpers/predicates';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { updatePagination } from '../pagination/paginationSlice';
import { APP_URL_ROOT, initialState } from '@/helpers/constants';

export const Layout = () => {
  const [state, setState] = useState(initialState);
  const [localstorage, setLocalstorage] = useLocalStorage();
  const [searchParams, setSearchParams] = useSearchParams('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateStatus = (newStatus: Status): void => {
    setState((prevState) => ({ ...prevState, status: newStatus }));
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, query: e.target.value });
  };

  const handleSearch = (): void => {
    if (state.status === 'submitting') return;
    fetchEpisodes(state.query, 0);
    setLocalstorage(state.query);

    navigate(APP_URL_ROOT);
    setSearchParams({ search: state.query, page: '1' });
  };

  const handleQueryReset = (): void => {
    setState((prevState) => ({ ...prevState, query: '' }));
  };

  const fetchEpisodes = useCallback(
    (term: string, page: number) => {
      updateStatus('submitting');
      api
        .searchEpisodes(term.trim(), page)
        .then((resp) => {
          if (isEpisodeBaseResponse(resp)) {
            dispatch(updatePagination(resp.page));
            dispatch(updateEpisodes(resp.episodes));
            setState((prevState) => ({ ...prevState, data: resp.episodes }));
          } else {
            console.log(`this is a bad response (code: ${resp.status}) `, resp.statusText);
          }
        })
        .catch(() => console.log('this is a network error'))
        .finally(() => {
          updateStatus('idle');
        });
    },
    [dispatch],
  );

  useEffect(() => {
    const search = searchParams.get('search') || localstorage;
    const pageParam = Number(searchParams.get('page') || '');
    const page = pageParam > 0 ? pageParam - 1 : 0;

    setState((prevState) => ({ ...prevState, query: search }));
    fetchEpisodes(search, page);
  }, [fetchEpisodes, localstorage, searchParams]);

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
      <Main />
    </>
  );
};
