import { Index } from './components/index';
import Card from './components/card/card';
import { Layout } from './components/layout/layout';
import ErrorPage from './components/errorPage/errorPage';
import { episodeLoader } from './components/card/loader';
import { APP_URL_EPISODE, APP_URL_ROOT } from './helpers/constants';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={APP_URL_ROOT} element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Index />} />
      <Route path={`${APP_URL_EPISODE}:episodeId`} element={<Card />} loader={episodeLoader} />
    </Route>,
  ),
);
