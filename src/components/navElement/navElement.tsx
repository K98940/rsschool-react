import { NavLink } from 'react-router-dom';
import { EpisodeBase } from '@/types/types';
import classes from './navElement.module.css';
import { APP_URL_EPISODE } from '@/helpers/constants';

type NavElementProps = {
  episode: EpisodeBase;
  search: string;
};
export default function NavElement({ episode, search }: NavElementProps) {
  return (
    <li className={classes.navElement}>
      {
        <NavLink
          to={{
            pathname: `${APP_URL_EPISODE}${episode.uid}`,
            search: search ? `?search=${search}` : '',
          }}
          className={({ isActive, isPending }) => (isActive ? classes.active : isPending ? classes.pending : '')}
        >
          {episode.title}
        </NavLink>
      }
    </li>
  );
}
