import Head from 'next/head';
import { Card } from '@/components/card/card';
import { Main } from '@/components/main/main';
import { BASE_URL, PAGE_SIZE, paths } from '@/helpers/constants';
import { EpisodeBaseResponse, EpisodeFullResponse } from '@/types/types';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps = (async ({ query }: GetServerSidePropsContext) => {
  const pageNumber = Number(query?.pageNumber?.toString() || '1');
  const id = query?.id?.toString() || '1';
  const responseEpisodes = await fetch(
    `${BASE_URL}${paths.episodeSearch}?pageNumber=${pageNumber - 1}&pageSize=${PAGE_SIZE}`,
  );
  const responseEpisode = await fetch(`${BASE_URL}${paths.episode}${id}`);

  const episodes: EpisodeBaseResponse = await responseEpisodes.json();
  const episode: EpisodeFullResponse = await responseEpisode.json();

  return { props: { episodes, episode, pageNumber } };
}) satisfies GetServerSideProps<{ episodes: EpisodeBaseResponse; episode: EpisodeFullResponse; pageNumber: number }>;

const Pages = ({ episodes, episode, pageNumber }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const title = `page ${pageNumber} / ${episode.episode.title}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Main episodes={episodes.episodes}>
        <Card episode={episode.episode} />
      </Main>
    </>
  );
};

export default Pages;
