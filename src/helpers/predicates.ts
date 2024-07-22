import { EpisodeBaseResponse, EpisodeFull, EpisodeFullResponse } from '@/types/types';
import { ResponseKeys, EpisodeBaseResponseKeys, EpisodeFullResponseKeys, EpisodeFullKeys } from './constants';

export function isResponse(data: unknown | Response): data is Response {
  if (typeof data !== 'object') return false;
  return ResponseKeys.every((key) => key in (data as Response));
}
export function isEpisodeBaseResponse(data: unknown | EpisodeBaseResponse): data is EpisodeBaseResponse {
  if (typeof data !== 'object') return false;
  return EpisodeBaseResponseKeys.every((key) => key in (data as EpisodeBaseResponse));
}
export function isEpisodeFullResponse(data: unknown | EpisodeFullResponse): data is EpisodeFullResponse {
  if (typeof data !== 'object') return false;
  return EpisodeFullResponseKeys.every((key) => key in (data as EpisodeFullResponse));
}
export function isEpisodeFull(data: unknown | EpisodeFull): data is EpisodeFull {
  if (typeof data !== 'object') return false;
  return EpisodeFullKeys.every((key) => key in (data as EpisodeFull));
}
