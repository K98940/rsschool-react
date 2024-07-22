import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import classes from './episodes.module.css';
import CardEmpty from '../cardEmpty/cardEmpty';
import { selectEpisodes } from './episodesSlice';
import NavElement from '../navElement/navElement';
import { APP_URL_ROOT } from '@/helpers/constants';
import { Pagination } from '../pagination/pagination';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import EpisodeSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';

function Episodes() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const episodes = useSelector(selectEpisodes);

  if (episodes?.data?.length === 0) return <CardEmpty />;
  return (
    <>
      <div
        className={classes.episodeDetail}
        data-testid="episodes"
        onClick={(e: MouseEvent) => {
          if (e.target instanceof HTMLElement && e.target.tagName === 'NAV') {
            navigate(APP_URL_ROOT);
          }
        }}
      >
        <nav className={classes.episodesNavigation} data-testid="episodes-nav">
          <ol className={classes.navElements}>
            {episodes?.data?.map((episode, i) => <NavElement key={i} episode={episode} />)}
          </ol>
        </nav>
        <Pagination />
      </div>

      {navigation.state !== 'idle' ? <EpisodeSkeleton /> : <Outlet />}
    </>
  );
}

export { Episodes };
