import { EpisodeBase } from '@/types/types';
import classes from './navElement.module.css';
import { NavLink, Params } from '@remix-run/react';
import { APP_URL_EPISODE } from '@/helpers/constants';
import { EpisodeCheckbox } from '../episodeCheckbox/episodeCheckbox';

type NavElementProps = {
  episode: EpisodeBase;
  currentPath: string;
  search: string;
  params: Params<string>;
};
export default function NavElement({ episode, search, params }: NavElementProps) {
  const pageRoute = params?.page ? `/page/${params?.page}` : '';

  return (
    <li className={classes.navElement}>
      <EpisodeCheckbox episode={episode} />
      {
        <NavLink
          to={{
            pathname: `${pageRoute}/${APP_URL_EPISODE}${episode.uid}`,
            search: `?search=${search}`,
          }}
          className={({ isActive, isPending }) => (isActive ? classes.active : isPending ? classes.pending : '')}
        >
          {episode.title}
        </NavLink>
      }
    </li>
  );
}
