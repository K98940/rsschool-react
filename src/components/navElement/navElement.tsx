import Link from 'next/link';
import { EpisodeBase } from '@/types/types';
import classes from './navElement.module.css';
import { EpisodeCheckbox } from '../episodeCheckbox/episodeCheckbox';

type NavElementProps = {
  params: { page: string; episode: string };
  episode: EpisodeBase;
  searchParams: { [key: string]: string | string[] | undefined };
};
export default function NavElement({ episode, searchParams, params }: NavElementProps) {
  const { page, episode: id } = params;
  let href = `/page/${page}/episode/${episode.uid}`;
  if (searchParams && 'search' in searchParams) {
    const search = searchParams?.search;
    if (search) href += `?search=${search}`;
  }

  const classList = `${classes.navElement} ${id === episode.uid ? classes.active : ''}`;
  return (
    <li className={classList}>
      <EpisodeCheckbox episode={episode} />
      {<Link href={href}>{episode.title}</Link>}
    </li>
  );
}
