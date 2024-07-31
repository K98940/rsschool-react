import { memo, ReactNode } from 'react';
import classes from './main.module.css';
import { EpisodeBase } from '@/types/types';
import { Episodes } from '../episodes/episodes';

type MainProps = {
  episodes: EpisodeBase[];
  children?: ReactNode;
};

export const Main = memo(({ children, episodes }: MainProps) => {
  return (
    <main className={classes.main}>
      <Episodes episodes={episodes}>{children}</Episodes>
    </main>
  );
});
