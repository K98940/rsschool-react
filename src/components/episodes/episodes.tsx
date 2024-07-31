import classes from './episodes.module.css';
import { EpisodeBase } from '@/types/types';
import { MouseEvent, ReactNode } from 'react';
import useGetParams from '@/hooks/useGetParams';
import NavElement from '../navElement/navElement';
import { Pagination } from '../pagination/pagination';

type EpisodesProps = {
  episodes: EpisodeBase[];
  children?: ReactNode;
};

function Episodes({ children, episodes }: EpisodesProps) {
  const { pageNumber, router } = useGetParams();

  return (
    <>
      <div
        className={classes.episodeDetail}
        data-testid="episodes"
        onClick={(e: MouseEvent) => {
          if (e.target instanceof HTMLElement && e.target.tagName === 'NAV') {
            router.push(`/page/${pageNumber}`);
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

      {children}
    </>
  );
}

export { Episodes };
