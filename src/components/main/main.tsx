import { memo } from 'react';
import classes from './main.module.css';
import { Episodes } from '../episodes/episodes';

export const Main = memo(() => {
  return (
    <main className={classes.main}>
      <Episodes />
    </main>
  );
});
