import classes from './index.module.css';

export const Index = () => {
  return (
    <section className={classes.container}>
      <h1 className={classes.title} data-testid="index-title">
        Select episode...
      </h1>
    </section>
  );
};
