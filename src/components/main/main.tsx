import { memo, ReactNode } from 'react';
import classes from './main.module.css';
import { Episodes } from '../episodes/episodes';

type MainProps = {
  params: { page: string; episode: string };
  children?: ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const Main = memo(({ children, params, searchParams }: MainProps) => {
  return (
    <main className={classes.main}>
      <Episodes params={params} searchParams={searchParams}>
        {children}
      </Episodes>
    </main>
  );
});
