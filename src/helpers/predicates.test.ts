import { isEpisodeBaseResponse, isEpisodeFullResponse, isResponse } from './predicates';

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
