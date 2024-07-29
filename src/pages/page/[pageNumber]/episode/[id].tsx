import Head from 'next/head';
import { Card } from '@/components/card/card';
import { Main } from '@/components/main/main';
import useGetParams from '@/hooks/useGetParams';
import { useGetDetailsQuery } from '@/api/apiSlice';
import { isEpisodeFull } from '@/helpers/predicates';

const Episode = () => {
  const { pageNumber, id } = useGetParams();
  const { data } = useGetDetailsQuery(id);
  const episode = data?.episode;
  let title = '';
  if (isEpisodeFull(episode)) {
    title = ` / ${episode.title}`;
  }

  return (
    <>
      <Head>
        <title>
          page {pageNumber} {title}
        </title>
      </Head>
      <Main>
        <Card />
      </Main>
    </>
  );
};

export default Episode;
