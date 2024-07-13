import classes from './cardEmpty.module.css';

export default function CardEmpty() {
  return (
    <section className={classes.container}>
      <div className={classes.card}>
        <header className={classes.cardHeader} data-testid="cardempty-header">
          Found nothing
        </header>
        <p className={classes.content}>∅</p>
      </div>
    </section>
  );
}
