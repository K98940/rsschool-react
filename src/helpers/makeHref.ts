import { Params } from '@/types/types';

type makeHrefProps = {
  pageNumber: number;
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
};

const makeHref = ({ pageNumber: pageNamber, params, searchParams }: makeHrefProps): string => {
  let href = `/page/${pageNamber}`;

  const id = params?.id;
  if (id) href += `/episode/${id}`;

  if (searchParams && 'search' in searchParams) {
    const search = searchParams?.search;
    if (search) href += `?search=${search}`;
  }

  return href;
};

export { makeHref };
