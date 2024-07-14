import { NavLink } from 'react-router-dom';
import { EpisodeBase } from '@/types/types';
import classes from './navElement.module.css';
import { APP_URL_EPISODE } from '@/helpers/constants';

type NavElementProps = {
  episode: EpisodeBase;
  search: string;
  page: string;
};
export default function NavElement({ episode, search, page }: NavElementProps) {
  const search1 = search ? `?search=${search}` : '';
  const search2 = page ? `&page=${page}` : '';
  const searchParams = search1 + search2;

  return (
    <li className={classes.navElement}>
      {
        <NavLink
          to={{
            pathname: `${APP_URL_EPISODE}${episode.uid}`,
            search: searchParams,
          }}
          className={({ isActive, isPending }) => (isActive ? classes.active : isPending ? classes.pending : '')}
        >
          {episode.title}
        </NavLink>
      }
    </li>
  );
}
