import classes from './episodesSkeleton.module.css';

export default function EpisodeSkeleton() {
  return (
    <section className={classes.container}>
      <div className={classes.mockСard}>
        <header className={`${classes.mockСardHeader} ${classes.animation}`}>Loading...</header>
        <div className={classes.mockСontentContainer}>
          <div className={classes.mockСontent}></div>
          <div className={classes.mockСontent}></div>
          <div className={classes.mockСontent}></div>
        </div>
      </div>
    </section>
  );
}
