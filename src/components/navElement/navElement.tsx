import { NavLink } from 'react-router-dom';
import { EpisodeBase } from '@/types/types';
import classes from './navElement.module.css';
import { APP_URL_EPISODE } from '@/helpers/constants';
import { EpisodeCheckbox } from '../episodeCheckbox/episodeCheckbox';

type NavElementProps = {
  episode: EpisodeBase;
};
export default function NavElement({ episode }: NavElementProps) {
  return (
    <li className={classes.navElement}>
      <EpisodeCheckbox episode={episode} />
      {
        <NavLink
          to={{
            pathname: `${APP_URL_EPISODE}${episode.uid}`,
          }}
          className={({ isActive, isPending }) => (isActive ? classes.active : isPending ? classes.pending : '')}
        >
          {episode.title}
        </NavLink>
      }
    </li>
  );
}
