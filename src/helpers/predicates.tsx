import { AnimalBaseResponse } from '@/types/types';
import { ResponseKeys, AnimalBaseResponseKeys } from './constants';

export function isResponse(data: unknown | Response): data is Response {
  if (typeof data !== 'object') return false;
  return ResponseKeys.every((key) => key in (data as Response));
}
export function isAnimalBaseResponse(data: unknown | AnimalBaseResponse): data is AnimalBaseResponse {
  if (typeof data !== 'object') return false;
  return AnimalBaseResponseKeys.every((key) => key in (data as AnimalBaseResponse));
}
