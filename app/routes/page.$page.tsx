import { getEpisodes } from '@/api/getEpisodes';
import Spinner from '@/components/spinner/spinner';
import { LoaderFunctionArgs } from '@remix-run/node';
import { Episodes } from '@/components/episodes/episodes';
import { content, titleCommon } from '@/helpers/constants';
import { ErrorComponent } from '@/components/errorComponent/errorComponent';
import { MetaFunction, Outlet, useLoaderData, useNavigation, useRouteError } from '@remix-run/react';

const noticeEpisode = 'Select an episode...';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { searchParams, pathname } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const pageNumber = params?.page || '1';

  const episodesResponse = await getEpisodes(pageNumber, search);
  return { episodesResponse, search, pathname, params };
};

const Page = () => {
  const { episodesResponse, search, pathname, params } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <>
      <main className="main">
        {navigation.state !== 'idle' && <Spinner />}
        <Episodes episodesResponse={episodesResponse} search={search} currentPath={pathname} params={params} />
        <Outlet />
        <p className="notice-episode">{noticeEpisode}</p>
      </main>
    </>
  );
};

export function ErrorBoundary() {
  const error = useRouteError();
  return ErrorComponent(error);
}

export const meta: MetaFunction<typeof loader> = ({ params }) => {
  const title = params?.page ? `${titleCommon} ◾ page ${params?.page}` : titleCommon;
  return [{ title }, { name: 'description', content }];
};

export default Page;
