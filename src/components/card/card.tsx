import classes from './card.module.css';
import CardEmpty from '../cardEmpty/cardEmpty';
import useGetParams from '@/hooks/useGetParams';
import { useGetDetailsQuery } from '@/api/apiSlice';
import { isEpisodeFull } from '@/helpers/predicates';
import EpisodeSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';

export const Card = () => {
  const { router, id, pageNumber } = useGetParams();
  const result = useGetDetailsQuery(id);

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
              router.push(`/page/${pageNumber}`);
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
