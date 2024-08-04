import useGetParams from '@/hooks/useGetParams';
import { renderHook } from '@testing-library/react';

vitest.mock(import('next/navigation'), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useRouter: vitest.fn(() => 'useRouter'),
    useSearchParams: vitest.fn(() => ({ id: 'testId', pageNumber: '2', get: () => '55' })),
  };
});

describe('useGetParams hook', () => {
  test('Should return value', async () => {
    const params = renderHook(() => useGetParams());

    expect(params.result.current).toMatchObject({ router: 'useRouter', id: '55', pageNumber: 55 });
  });
});
