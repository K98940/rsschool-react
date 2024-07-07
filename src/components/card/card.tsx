import classes from './card.module.css';
import { EpisodeBase } from '@/types/types';
import { Component, ReactNode } from 'react';

export type CardProps = {
  data: EpisodeBase;
};

class Card extends Component<CardProps> {
  render(): ReactNode {
    return (
      <section className={classes.container}>
        <div className={classes.card}>
          <header className={classes.cardHeader} title={this.props.data.title}>
            {this.props.data.title}
          </header>
          <div className={classes.contentContainer}>
            <p className={classes.content}>
              <strong>Season:</strong> {this.props.data.season.title}
            </p>
            <p className={classes.content}>
              <strong>Series:</strong> {this.props.data.series.title}
            </p>
            <p className={classes.content}>
              <strong>Date:</strong> {this.props.data.usAirDate}
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default Card;
