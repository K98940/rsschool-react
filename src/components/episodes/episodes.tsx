import { MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import classes from './episodes.module.css';
import CardEmpty from '../cardEmpty/cardEmpty';
import { selectEpisodes } from './episodesSlice';
import NavElement from '../navElement/navElement';
import { APP_URL_ROOT } from '@/helpers/constants';
import { Pagination } from '../pagination/pagination';
import EpisodeSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';
import { Outlet, useNavigate, useNavigation, useSearchParams } from 'react-router-dom';

function Episodes() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const episodes = useSelector(selectEpisodes);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '';
  const search = searchParams.get('search') || '';

  if (episodes.length === 0) return <CardEmpty />;
  return (
    <>
      <div
        className={classes.episodeDetail}
        data-testid="episodes"
        onClick={(e: MouseEvent) => {
          if (e.target instanceof HTMLElement && e.target.tagName === 'NAV') {
            navigate(APP_URL_ROOT);
            setSearchParams({ search, page });
          }
        }}
      >
        <nav className={classes.episodesNavigation} data-testid="episodes-nav">
          <ol className={classes.navElements}>
            {episodes?.map((episode, i) => <NavElement key={i} episode={episode} search={search} page={page} />)}
          </ol>
        </nav>
        <Pagination />
      </div>

      {navigation.state !== 'idle' ? <EpisodeSkeleton /> : <Outlet />}
    </>
  );
}

export { Episodes };
