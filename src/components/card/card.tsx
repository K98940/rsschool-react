import { useEffect } from 'react';
import classes from './card.module.css';
import CardEmpty from '../cardEmpty/cardEmpty';
import { APP_URL_ROOT } from '@/helpers/constants';
import { isEpisodeFull } from '@/helpers/predicates';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchDetails, selectDetails, selectStatus } from './detailSlice';
import EpisodeSkeleton from '../skeletones/episodesSkeleton/episodesSkeleton';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

export const Card = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const episodeId = useLoaderData() as string;
  const status = useAppSelector(selectStatus);
  const details = useAppSelector(selectDetails);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchDetails(episodeId));
  }, [dispatch, episodeId]);

  if (status === 'submitting') return <EpisodeSkeleton />;
  if (episodeId && isEpisodeFull(details)) {
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
              const search = searchParams.get('search') || '';
              const page = searchParams.get('page') || '';
              navigate(APP_URL_ROOT);
              setSearchParams({ search, page });
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
