import { NavLink } from 'react-router-dom';
import { EpisodeBase } from '@/types/types';
import classes from './navElement.module.css';
import { URL_EPISODE } from '@/helpers/constants';

type NavElementProps = {
  episode: EpisodeBase;
};
export default function NavElement({ episode }: NavElementProps) {
  return (
    <li className={classes.navElement}>
      {
        <NavLink
          to={`${URL_EPISODE}${episode.uid}`}
          className={({ isActive, isPending }) => (isActive ? classes.active : isPending ? classes.pending : '')}
        >
          {episode.title}
        </NavLink>
      }
    </li>
  );
}
