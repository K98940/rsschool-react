import { Main } from '../main/main';
import Header from '../header/header';
import Spinner from '../spinner/spinner';
import { Flyout } from '../flyout/flyout';
import { useAppSelector } from '@/hooks/hooks';
import { useGetEpisodesQuery } from '@/api/apiSlice';
import { selectPageNumber, selectQuery } from '../episodes/episodesSlice';

export const Layout = () => {
  const pageNumber = useAppSelector(selectPageNumber);
  const query = useAppSelector(selectQuery);
  const { isFetching } = useGetEpisodesQuery({ query, pageNumber });

  return (
    <>
      {isFetching && <Spinner />}
      <Header />
      <Main />
      <Flyout />
    </>
  );
};
