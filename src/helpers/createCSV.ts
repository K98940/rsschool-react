import { EpisodeBase } from '@/types/types';

const separator = ';';
const header = 'episode title;episode season;series title\n';
const quoted = (s: string) => `"${s}"${separator}`;
const getRow = (e: EpisodeBase) => `${quoted(e.title)}${quoted(e.season.title)}${quoted(e.series.title)}\n`;

export default (episodes: EpisodeBase[]): string[] => [header, ...episodes.map((episode) => getRow(episode))];
