'use client';
import classes from './episodes.module.css';
import { selectQuery } from './episodesSlice';
import { MouseEvent, ReactNode } from 'react';
import { useAppSelector } from '@/hooks/hooks';
import useGetParams from '@/hooks/useGetParams';
import NavElement from '../navElement/navElement';
import { useGetEpisodesQuery } from '@/api/apiSlice';
import { Pagination } from '../pagination/pagination';
import { isEpisodeBaseResponse } from '@/helpers/predicates';

type EpisodesProps = {
  children?: ReactNode;
};

function Episodes({ children }: EpisodesProps) {
  const { pageNumber, router } = useGetParams();
  const query = useAppSelector(selectQuery);
  const { data } = useGetEpisodesQuery({ query, pageNumber });

  if (!isEpisodeBaseResponse(data)) return;
  const { episodes } = data;

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
