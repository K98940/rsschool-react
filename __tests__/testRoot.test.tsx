import { loader } from '~/root';

const dataResponse = {
  search: '?search=one',
  pathname: '/page/1/episode/12345678',
  params: { episode: '12345678', page: '1' },
};

describe('Root Loader', () => {
  it('should return a response', async () => {
    const request = new Request('http://localhost/page/1/episode/12345678?search=one');
    const params = { episode: '12345678', page: '1' };

    const response = await loader({
      request: new Request(request),
      params,
      context: {},
    });

    expect(response).toEqual(dataResponse);
  });
});
