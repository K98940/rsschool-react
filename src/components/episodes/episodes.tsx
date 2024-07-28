import { MouseEvent } from 'react';
import classes from './episodes.module.css';
import CardEmpty from '../cardEmpty/cardEmpty';
import { useAppSelector } from '@/hooks/hooks';
import NavElement from '../navElement/navElement';
import { APP_URL_ROOT } from '@/helpers/constants';
import { useGetEpisodesQuery } from '@/api/apiSlice';
import { Pagination } from '../pagination/pagination';
import { isEpisodeBaseResponse } from '@/helpers/predicates';
import { selectPageNumber, selectQuery } from './episodesSlice';
import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import EpisodeSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';

function Episodes() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const pageNumber = useAppSelector(selectPageNumber);
  const query = useAppSelector(selectQuery);
  const { data } = useGetEpisodesQuery({ query, pageNumber });

  if (!isEpisodeBaseResponse(data)) return <CardEmpty />;
  const { episodes } = data;

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
            {episodes.map((episode, i) => (
              <NavElement key={i} episode={episode} />
            ))}
          </ol>
        </nav>
        <Pagination />
      </div>

      {navigation.state !== 'idle' ? <EpisodeSkeleton /> : <Outlet />}
    </>
  );
}

export { Episodes };
