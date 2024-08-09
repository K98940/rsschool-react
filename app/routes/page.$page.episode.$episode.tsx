import { Card } from '@/components/card/card';
import { getEpisode } from '@/api/getEpisode';
import { LoaderFunctionArgs } from '@remix-run/node';
import { content, titleCommon } from '@/helpers/constants';
import { MetaFunction, useLoaderData, useRouteError } from '@remix-run/react';
import { ErrorComponent } from '@/components/errorComponent/errorComponent';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { searchParams, pathname } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const episodeUID = params?.episode || '0';

  const episodeResponse = await getEpisode(episodeUID);
  return { episodeResponse, search, pathname, params };
};

const PageEpisode = () => {
  const { episodeResponse, params, search } = useLoaderData<typeof loader>();
  const path = params?.page ? `/page/${params?.page}` : '/page/1';
  const query = search ? `?search=${search}` : '';
  const closePath = `${path}${query}`;

  return <Card episode={episodeResponse?.episode} closePath={closePath} />;
};

export function ErrorBoundary() {
  const error = useRouteError();
  return ErrorComponent(error);
}

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  const titleEpisode = data?.episodeResponse?.episode.title ? ` ◾ ${data?.episodeResponse?.episode.title}` : '';
  const title = params?.page ? `${titleCommon} ◾ page ${params?.page}` : titleCommon;
  return [{ title: title + titleEpisode }, { name: 'description', content }];
};

export default PageEpisode;
