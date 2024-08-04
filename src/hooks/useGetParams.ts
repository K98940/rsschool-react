'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type GetParams = { router: AppRouterInstance; id: string; pageNumber: number };

const useGetParams = (): GetParams => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') || '';
  const pageNumber = Number(searchParams?.get('pageNumber')) || 1;
  return { router, id, pageNumber };
};

export default useGetParams;
