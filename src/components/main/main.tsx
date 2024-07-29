import { memo, ReactNode } from 'react';
import classes from './main.module.css';
import { Episodes } from '../episodes/episodes';

type MainProps = {
  children?: ReactNode;
};

export const Main = memo(({ children }: MainProps) => {
  return (
    <main className={classes.main}>
      <Episodes>{children}</Episodes>
    </main>
  );
});
