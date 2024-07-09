import Card from '../card/card';
import classes from './main.module.css';
import { EpisodeBase } from '@/types/types';
import CardEmpty from '../cardEmpty/cardEmpty';

type MainProps = {
  episodes: EpisodeBase[] | undefined;
};

export default function Main({ episodes }: MainProps) {
  if (episodes?.length === 0)
    return (
      <main className={classes.main}>
        <CardEmpty />
      </main>
    );
  return <main className={classes.main}>{episodes?.map((episode, i) => <Card episode={episode} key={i} />)}</main>;
}
