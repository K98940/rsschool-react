import { Outlet, useNavigate, useNavigation } from 'react-router-dom';
import classes from './main.module.css';
import { memo, MouseEvent } from 'react';
import CardEmpty from '../cardEmpty/cardEmpty';
import NavElement from '../navElement/navElement';
import { APP_URL_ROOT } from '@/helpers/constants';
import { EpisodeBaseResponse } from '@/types/types';
import EpisodeSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';
import { Pagination } from '../pagination/pagination';

type MainProps = {
  data: EpisodeBaseResponse | null;
  handleChangePage: (page: number) => void;
};

export const Main = memo(({ data, handleChangePage }: MainProps) => {
  return (
    <main className={classes.main}>
      <Episodes data={data} handleChangePage={handleChangePage} />
    </main>
  );
});

function Episodes({ data, handleChangePage }: MainProps) {
  const navigation = useNavigation();
  const navigate = useNavigate();
  if (!data || data.episodes?.length === 0)
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
            {data.episodes?.map((episode, i) => <NavElement key={i} episode={episode} />)}
          </ol>

          {/* <button onClick={() => handleChangePage(page - 1)}> &lt; {page}</button>
          <button onClick={() => handleChangePage(page + 1)}> &gt; {page}</button> */}
        </nav>
        <Pagination page={data.page} handleChangePage={handleChangePage} />
      </div>

      {navigation.state !== 'idle' ? <EpisodeSkeleton /> : <Outlet />}
    </>
  );
}
// вынести кнопки в отдельный компонент пагинация
// во время пагинации добавить спиннер
