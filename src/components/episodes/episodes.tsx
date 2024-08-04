import { ReactNode } from 'react';
import classes from './episodes.module.css';
import { getEpisodes } from '@/api/getEpisodes';
import NavElement from '../navElement/navElement';
import { Pagination } from '../pagination/pagination';

type EpisodesProps = {
  params: { page: string; episode: string };
  children?: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
};

async function Episodes({ children, params, searchParams }: EpisodesProps) {
  const page = params?.page || '1';
  const episodeBaseResponse = await getEpisodes(page, searchParams);
  if (!episodeBaseResponse) return;

  return (
    <>
      <div className={classes.episodeDetail} data-testid="episodes">
        <nav className={classes.episodesNavigation} data-testid="episodes-nav">
          <ol className={classes.navElements}>
            {episodeBaseResponse.episodes?.map((episode, i) => (
              <NavElement key={i} episode={episode} searchParams={searchParams} params={params} />
            ))}
          </ol>
        </nav>
        <Pagination page={episodeBaseResponse.page} params={params} searchParams={searchParams} />
      </div>

      {children}
    </>
  );
}

export { Episodes };
