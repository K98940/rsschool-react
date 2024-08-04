import classes from './main.module.css';
import { Episodes } from '../episodes/episodes';
import { memo, ReactNode, Suspense } from 'react';
import EpisodesSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';

type MainProps = {
  params: { page: string; episode: string };
  children?: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const Main = memo(({ children, params, searchParams }: MainProps) => {
  return (
    <main className={classes.main}>
      <Suspense fallback={<EpisodesSkeleton />}>
        <Episodes params={params} searchParams={searchParams}>
          {children}
        </Episodes>
      </Suspense>
    </main>
  );
});
