import Link from 'next/link';
import { EpisodeBase } from '@/types/types';
import classes from './navElement.module.css';
import useGetParams from '@/hooks/useGetParams';
import { EpisodeCheckbox } from '../episodeCheckbox/episodeCheckbox';

type NavElementProps = {
  episode: EpisodeBase;
};
export default function NavElement({ episode }: NavElementProps) {
  const { pageNumber, id } = useGetParams();
  const href = `/page/${pageNumber}/episode/${episode.uid}`;
  const classList = `${classes.navElement} ${id === episode.uid ? classes.active : ''}`;

  return (
    <li className={classList}>
      <EpisodeCheckbox episode={episode} />
      {<Link href={href}>{episode.title}</Link>}
    </li>
  );
}
