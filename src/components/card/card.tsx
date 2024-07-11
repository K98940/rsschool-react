import classes from './card.module.css';
import CardEmpty from '../cardEmpty/cardEmpty';
import { APP_ROOT_URL } from '@/helpers/constants';
import { isEpisodeFullResponse } from '@/helpers/predicates';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function Card() {
  const data = useLoaderData();
  const navigate = useNavigate();

  if (isEpisodeFullResponse(data)) {
    const { episode } = data;
    if (!episode) return <CardEmpty />;
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
          <button className={classes.btnCloseCard} onClick={() => navigate(APP_ROOT_URL)}>
            Close
          </button>
        </div>
      </section>
    );
  }
}
