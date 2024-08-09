import classes from './episodesSkeleton.module.css';

export default function EpisodesSkeleton() {
  return (
    <section className={classes.skeleton} data-testid="skeleton-episodes">
      <div className={classes.skeletonLfet}>
        <div className={classes.skeletonItem}></div>
        <div className={classes.skeletonItem}></div>
        <div className={classes.skeletonItem}></div>
        <div className={classes.skeletonItem}></div>
        <div className={classes.skeletonItem}></div>
        <div className={classes.skeletonItem}></div>
        <div className={classes.skeletonItem}></div>
        <div className={classes.skeletonItem}></div>
        <div className={classes.skeletonItem}></div>
        <div className={classes.skeletonItem}></div>
      </div>
      <div className={classes.skeletonRight}>Select an episode...</div>
    </section>
  );
}
