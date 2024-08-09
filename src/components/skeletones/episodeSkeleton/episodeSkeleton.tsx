import classes from './episodeSkeleton.module.css';

export default function EpisodeSkeleton() {
  return (
    <section className={classes.container} data-testid="skeleton-episode">
      <div className={classes.mockСard}>
        <header className={`${classes.mockСardHeader} ${classes.animation}`} data-testid="skeleton-title">
          Loading...
        </header>
        <div className={classes.mockСontentContainer}>
          <div className={classes.mockСontent}></div>
          <div className={classes.mockСontent}></div>
          <div className={classes.mockСontent}></div>
          <div className={classes.mockСontent}></div>
        </div>
      </div>
    </section>
  );
}
