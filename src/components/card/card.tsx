import classes from './card.module.css';
import CardEmpty from '../cardEmpty/cardEmpty';
import { APP_URL_ROOT } from '@/helpers/constants';
import { useGetDetailsQuery } from '@/api/apiSlice';
import { isEpisodeFull } from '@/helpers/predicates';
import { useNavigate, useParams } from 'react-router-dom';
import EpisodeSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';

export const Card = () => {
  const navigate = useNavigate();
  const { episodeId } = useParams();
  const result = useGetDetailsQuery(episodeId || '');

  if (result.isFetching) return <EpisodeSkeleton />;
  if (result.data && isEpisodeFull(result.data.episode)) {
    const details = result.data.episode;
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
            onClick={() => {
              navigate(APP_URL_ROOT);
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
