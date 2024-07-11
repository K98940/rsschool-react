import {
  Outlet,
  useNavigate,
  useLoaderData,
  useNavigation,
  LoaderFunction,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import api from '@/api/api';
import { memo, MouseEvent } from 'react';
import Card from '../card/card';
import Index from '@/routes/index';
import classes from './main.module.css';
import { EpisodeBase } from '@/types/types';
import ErrorPage from '../errorPage/errorPage';
import CardEmpty from '../cardEmpty/cardEmpty';
import NavElement from '../navElement/navElement';
import { APP_URL_ROOT, APP_URL_EPISODE } from '@/helpers/constants';
import EpisodeSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';

type MainProps = {
  episodes: EpisodeBase[] | undefined;
};

export const Main = memo(({ episodes }: MainProps) => {
  const episodesLoader: LoaderFunction = () => ({ episodes });
  const episodeLoader: LoaderFunction = async ({ params }) => {
    const response = await api.getEpisode(params?.episodeId || '');
    return response;
  };

  const router = createBrowserRouter([
    {
      path: APP_URL_ROOT,
      element: <Episodes />,
      errorElement: <ErrorPage />,
      loader: episodesLoader,
      children: [
        { index: true, element: <Index /> },
        {
          path: `${APP_URL_EPISODE}:episodeId`,
          element: <Card />,
          loader: episodeLoader,
        },
      ],
    },
  ]);

  return (
    <main className={classes.main}>
      <RouterProvider router={router} />
    </main>
  );
});

function Episodes() {
  const navigation = useNavigation();
  const navigate = useNavigate();
  const { episodes } = useLoaderData() as MainProps;
  if (episodes?.length === 0)
    return (
      <main className={classes.main}>
        <CardEmpty />
      </main>
    );
  return (
    <>
      <div
        className={classes.episodeDetail}
        onClick={(e: MouseEvent) => {
          if (e.target instanceof HTMLElement && e.target.tagName === 'NAV') navigate(APP_URL_ROOT);
        }}
      >
        <nav className={classes.episodesNavigation}>
          <ol className={classes.navElements}>
            {episodes?.map((episode, i) => <NavElement key={i} episode={episode} />)}
          </ol>
        </nav>
      </div>
      {navigation.state !== 'idle' ? <EpisodeSkeleton /> : <Outlet />}
    </>
  );
}
