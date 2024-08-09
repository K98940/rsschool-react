import { Params } from '@remix-run/react';
import classes from './episodes.module.css';
import NavElement from '../navElement/navElement';
import { EpisodeBaseResponse } from '@/types/types';
import { Pagination } from '../pagination/pagination';

const noEpisodes = 'No episodes...';

type EpisodesProps = {
  episodesResponse: EpisodeBaseResponse;
  currentPath: string;
  search: string;
  params: Params<string>;
};

const Episodes = ({ episodesResponse, currentPath, search, params }: EpisodesProps) => {
  const episodes = episodesResponse?.episodes;
  return (
    <div className={classes.episodes} data-testid="episodes">
      {episodes?.length ? (
        <Navigation episodesResponse={episodesResponse} currentPath={currentPath} search={search} params={params} />
      ) : (
        <h1>{noEpisodes}</h1>
      )}
    </div>
  );
};

const Navigation = ({ episodesResponse, currentPath, search, params }: EpisodesProps) => {
  const { episodes } = episodesResponse;
  return (
    <>
      <nav className={classes.episodesNavigation} data-testid="episodes-nav">
        <ol className={classes.navElements}>
          {episodes.map((episode) => (
            <NavElement key={episode.uid} episode={episode} currentPath={currentPath} search={search} params={params} />
          ))}
        </ol>
      </nav>
      <Pagination page={episodesResponse.page} search={search} />
    </>
  );
};

export { Episodes };
