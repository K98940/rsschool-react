import classes from './main.module.css';
import { memo, MouseEvent } from 'react';
import CardEmpty from '../cardEmpty/cardEmpty';
import NavElement from '../navElement/navElement';
import { APP_URL_ROOT } from '@/helpers/constants';
import { EpisodeBaseResponse } from '@/types/types';
import { Pagination } from '../pagination/pagination';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import EpisodeSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';

type MainProps = {
  data: EpisodeBaseResponse | null;
  handleChangePage: (page: number) => void;
};

export const Main = memo(({ data, handleChangePage }: MainProps) => {
  return (
    <main className={classes.main}>
      <Episodes data={data} handleChangePage={handleChangePage} />
    </main>
  );
});

function Episodes({ data, handleChangePage }: MainProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  if (!data || data.episodes?.length === 0)
    return (
      <main className={classes.main}>
        <CardEmpty />
      </main>
    );
  return (
    <>
      <div
        className={classes.episodeDetail}
        data-testid="episodes"
        onClick={(e: MouseEvent) => {
          if (e.target instanceof HTMLElement && e.target.tagName === 'NAV') navigate(APP_URL_ROOT);
        }}
      >
        <nav className={classes.episodesNavigation} data-testid="episodes-nav">
          <ol className={classes.navElements}>
            {data.episodes?.map((episode, i) => <NavElement key={i} episode={episode} />)}
          </ol>
        </nav>
        <Pagination page={data.page} handleChangePage={handleChangePage} />
      </div>

      {navigation.state !== 'idle' ? <EpisodeSkeleton /> : <Outlet />}
    </>
  );
}
