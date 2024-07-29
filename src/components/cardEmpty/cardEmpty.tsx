import classes from './cardEmpty.module.css';

export default function CardEmpty() {
  return (
    <section className={classes.container}>
      <h1 className={classes.cardHeader}>Select an episode...</h1>
    </section>
  );
}
