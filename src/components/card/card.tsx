import classes from './card.module.css';
import { AnimalBase } from '@/types/types';
import { Component, ReactNode } from 'react';

export type CardProps = {
  data: AnimalBase;
};

class Card extends Component<CardProps> {
  render(): ReactNode {
    return (
      <section className={classes.container}>
        <div className={classes.card}>
          <header className={classes.cardHeader}>{this.props.data.name}</header>
        </div>
      </section>
    );
  }
}

export default Card;
