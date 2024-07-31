import Head from 'next/head';
import { Main } from '@/components/main/main';
import { EpisodeBaseResponse } from '@/types/types';
import CardEmpty from '@/components/cardEmpty/cardEmpty';
import { BASE_URL, PAGE_SIZE, paths } from '@/helpers/constants';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types';

// eslint-disable-next-line react-refresh/only-export-components
export const getServerSideProps = (async ({ query }: GetServerSidePropsContext) => {
  const pageNumber = Number(query?.pageNumber?.toString() || '1');
  const res = await fetch(`${BASE_URL}${paths.episodeSearch}?pageNumber=${pageNumber - 1}&pageSize=${PAGE_SIZE}`);
  const episodes: EpisodeBaseResponse = await res.json();

  return { props: { episodes, pageNumber } };
}) satisfies GetServerSideProps<{ episodes: EpisodeBaseResponse; pageNumber: number }>;

const Pages = ({ episodes, pageNumber }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>{`page ${pageNumber}`}</title>
      </Head>
      <Main episodes={episodes.episodes}>
        <CardEmpty />
      </Main>
    </>
  );
};

export default Pages;
