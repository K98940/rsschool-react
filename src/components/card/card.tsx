import classes from './card.module.css';
import CardEmpty from '../cardEmpty/cardEmpty';
import { APP_URL_ROOT } from '@/helpers/constants';
import { isEpisodeFullResponse } from '@/helpers/predicates';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

export default function Card() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  if (data && isEpisodeFullResponse(data)) {
    const { episode } = data;
    if (!episode) return <CardEmpty />;
    return (
      <section className={classes.container}>
        <div className={classes.card}>
          <header className={classes.cardHeader} title={episode.title}>
            {episode.title}
          </header>
          <div className={classes.contentContainer}>
            <p className={classes.content} data-testid="card-season">
              <strong>Season:</strong> {episode.season.title}
            </p>
            <p className={classes.content} data-testid="card-series">
              <strong>Series:</strong> {episode.series.title}
            </p>
            <p className={classes.content} data-testid="card-date">
              <strong>Date:</strong> {episode.usAirDate}
            </p>
          </div>
          <button
            className={classes.btnCloseCard}
            onClick={() => {
              const search = searchParams.get('search') || '';
              navigate(APP_URL_ROOT);
              search && setSearchParams({ search });
            }}
          >
            Close
          </button>
        </div>
      </section>
    );
  }
  return <CardEmpty />;
}
