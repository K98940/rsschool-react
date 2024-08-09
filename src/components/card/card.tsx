import classes from './card.module.css';
import { EpisodeFull } from '@/types/types';
import CardEmpty from '../cardEmpty/cardEmpty';
import { useNavigate } from 'react-router-dom';
import { isEpisodeFull } from '@/helpers/predicates';

type CardProps = {
  episode: EpisodeFull | undefined;
  closePath: string;
};

export const Card = ({ episode, closePath }: CardProps) => {
  const navigate = useNavigate();
  if (episode && isEpisodeFull(episode)) {
    const details = episode;
    return (
      <section className={classes.container}>
        <div className={classes.card}>
          <header className={classes.cardHeader} title={details.title}>
            {details.title}
          </header>
          <div className={classes.contentContainer}>
            <p className={classes.content} data-testid="card-season">
              <strong>Season:</strong> {details.season.title}
            </p>
            <p className={classes.content} data-testid="card-series">
              <strong>Series:</strong> {details.series.title}
            </p>
            <p className={classes.content} data-testid="card-date">
              <strong>Date:</strong> {details.usAirDate}
            </p>
          </div>
          <button
            className={classes.btnCloseCard}
            data-testid="card-button-close"
            onClick={() => {
              navigate(closePath);
            }}
          >
            Close
          </button>
        </div>
      </section>
    );
  }
  return <CardEmpty />;
};
