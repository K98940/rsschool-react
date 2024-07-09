import classes from './card.module.css';
import { EpisodeBase } from '@/types/types';

export type CardProps = {
  episode: EpisodeBase;
};

export default function Card({ episode }: CardProps) {
  return (
    <section className={classes.container}>
      <div className={classes.card}>
        <header className={classes.cardHeader} title={episode.title}>
          {episode.title}
        </header>
        <div className={classes.contentContainer}>
          <p className={classes.content}>
            <strong>Season:</strong> {episode.season.title}
          </p>
          <p className={classes.content}>
            <strong>Series:</strong> {episode.series.title}
          </p>
          <p className={classes.content}>
            <strong>Date:</strong> {episode.usAirDate}
          </p>
        </div>
      </div>
    </section>
  );
}
