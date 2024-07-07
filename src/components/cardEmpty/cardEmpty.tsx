import classes from './cardEmpty.module.css';
import { Component, ReactNode } from 'react';

class CardEmpty extends Component {
  render(): ReactNode {
    return (
      <section className={classes.container}>
        <div className={classes.card}>
          <header className={classes.cardHeader}>Found nothing</header>
          <p className={classes.content}>∅</p>
        </div>
      </section>
    );
  }
}

export default CardEmpty;
