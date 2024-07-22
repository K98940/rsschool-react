import { EpisodeBase } from '@/types/types';

export default (episodes: EpisodeBase[]): string[] =>
  episodes.map(
    (e) => `episode title: ${e.title}; episode season: ${e.season.title}; series title: ${e.series.title}\n`,
  );
