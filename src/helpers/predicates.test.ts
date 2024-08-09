import { isEpisodeBase, isEpisodeBaseResponse, isEpisodeFull, isEpisodeFullResponse, isResponse } from './predicates';
import EpisodeFullResp from '../mocks/data/episodeFullResponse0';
import EpisodeBaseResp from '../mocks/data/episodeBaseResponse0';
import { EpisodeBaseResponse, EpisodeFullResponse } from '@/types/types';

const episodeFullResponse = EpisodeFullResp as unknown as EpisodeFullResponse[];
const episodeBaseResponse = EpisodeBaseResp as unknown as EpisodeBaseResponse;

describe('isResponse predicate', () => {
  it('accept Response should return true', () => {
    const result = isResponse(new Response());
    expect(result).toBeTruthy();
  });
  it('accept other object should return false', () => {
    const result = isResponse({ prop: 'bad data' });
    expect(result).toBeFalsy();
  });
  it('accept other data should return false', () => {
    const result = isResponse('test');
    expect(result).toBeFalsy();
  });
});

describe('isEpisodeBaseResponse predicate', () => {
  it('accept other object should return false', () => {
    const result = isEpisodeBaseResponse({
      page: '1',
      episodes: '3',
    });
    expect(result).toBeFalsy();
  });
  it('accept other data should return false', () => {
    const result = isEpisodeBaseResponse('test');
    expect(result).toBeFalsy();
  });
});

describe('isEpisodeFullResponse predicate', () => {
  it('accept other object should return false', () => {
    const result = isEpisodeFullResponse({
      page: '1',
      episodes: '3',
    });
    expect(result).toBeFalsy();
  });
  it('accept other data should return false', () => {
    const result = isEpisodeFullResponse('test');
    expect(result).toBeFalsy();
  });
});

describe('isEpisodeFull predicate', () => {
  it('accept other object should return false', () => {
    const result = isEpisodeFull({
      page: '1',
      episodes: '3',
    });
    expect(result).toBeFalsy();
  });
  it('accept other data should return false', () => {
    const result = isEpisodeFull('test');
    expect(result).toBeFalsy();
  });
  it('accept EpisodeFull should return true', () => {
    const result = isEpisodeFull(episodeFullResponse[0].episode);
    expect(result).toBeTruthy();
  });
});

describe('isEpisodeBase predicate', () => {
  it('accept other object should return false', () => {
    const result = isEpisodeBase(episodeFullResponse[0]);
    expect(result).toBeFalsy();
  });
  it('accept other data should return false', () => {
    const result = isEpisodeBase(episodeFullResponse);
    expect(result).toBeFalsy();
  });
  it('accept isEpisodeBase should return true', () => {
    const result = isEpisodeBase(episodeBaseResponse.episodes[0]);
    expect(result).toBeTruthy();
  });
});
