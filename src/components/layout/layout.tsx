import { Main } from '../main/main';
import Header from '../header/header';
import Spinner from '../spinner/spinner';
import { Flyout } from '../flyout/flyout';
import { useSelector } from 'react-redux';
import { selectStatus } from '../episodes/episodesSlice';

export const Layout = () => {
  const status = useSelector(selectStatus);

  return (
    <>
      {status === 'submitting' && <Spinner />}
      <Header />
      <Main />
      <Flyout />
    </>
  );
};
