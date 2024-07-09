import { EpisodeBaseResponse } from '@/types/types';
import { ResponseKeys, EpisodeBaseResponseKeys } from './constants';

export function isResponse(data: unknown | Response): data is Response {
  if (typeof data !== 'object') return false;
  return ResponseKeys.every((key) => key in (data as Response));
}
export function isEpisodeBaseResponse(data: unknown | EpisodeBaseResponse): data is EpisodeBaseResponse {
  if (typeof data !== 'object') return false;
  return EpisodeBaseResponseKeys.every((key) => key in (data as EpisodeBaseResponse));
}
