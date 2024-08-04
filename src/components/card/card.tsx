import Link from 'next/link';
import classes from './card.module.css';
import { getEpisode } from '@/api/getEpisode';
import CardEmpty from '../cardEmpty/cardEmpty';
import { isEpisodeFull, isSearchParam } from '@/helpers/predicates';

type CardProps = {
  page: string;
  searchParams?: { [key: string]: string | string[] | undefined };
  episodeId: string;
};

export const Card = async ({ page, episodeId, searchParams }: CardProps) => {
  const episodeFullResponse = await getEpisode(episodeId);

  if (episodeFullResponse && isEpisodeFull(episodeFullResponse.episode)) {
    let href = `/page/${page}`;
    if (isSearchParam(searchParams)) href += `?search=${searchParams.search}`;
    const details = episodeFullResponse.episode;

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
          <Link className={classes.btnCloseCard} href={href} data-testid="card-link-close">
            Close
          </Link>
        </div>
      </section>
    );
  }
  return <CardEmpty />;
};
