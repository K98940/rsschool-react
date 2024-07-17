import classes from './main.module.css';
import { memo, MouseEvent } from 'react';
import { EpisodeBase } from '@/types/types';
import CardEmpty from '../cardEmpty/cardEmpty';
import NavElement from '../navElement/navElement';
import { APP_URL_ROOT } from '@/helpers/constants';
import { Pagination } from '../pagination/pagination';
import EpisodeSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';
import { Outlet, useNavigate, useNavigation, useSearchParams } from 'react-router-dom';

type MainProps = {
  data: EpisodeBase[] | null;
};

export const Main = memo(({ data }: MainProps) => {
  return (
    <main className={classes.main}>
      <Episodes data={data} />
    </main>
  );
});

function Episodes({ data }: MainProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const page = searchParams.get('page') || '';

  if (!data || data?.length === 0)
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
          if (e.target instanceof HTMLElement && e.target.tagName === 'NAV') {
            navigate(APP_URL_ROOT);
            setSearchParams({ search, page });
          }
        }}
      >
        <nav className={classes.episodesNavigation} data-testid="episodes-nav">
          <ol className={classes.navElements}>
            {data?.map((episode, i) => <NavElement key={i} episode={episode} search={search} page={page} />)}
          </ol>
        </nav>
        <Pagination />
      </div>

      {navigation.state !== 'idle' ? <EpisodeSkeleton /> : <Outlet />}
    </>
  );
}
