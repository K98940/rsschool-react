import { NextRouter, useRouter } from 'next/router';

type GetParams = { router: NextRouter; id: string; pageNumber: number };

const useGetParams = (): GetParams => {
  const router = useRouter();
  const { query } = router;
  const id = typeof query.id === 'string' ? query.id : '';
  const pageNumber = Number(typeof query.pageNumber === 'string' ? query.pageNumber : '1') || 1;
  return { router, id, pageNumber };
};

export default useGetParams;
