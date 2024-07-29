import Head from 'next/head';
import { Main } from '@/components/main/main';
import { Card } from '@/components/card/card';
import useGetParams from '@/hooks/useGetParams';
import CardEmpty from '@/components/cardEmpty/cardEmpty';

const Pages = () => {
  const { pageNumber, id } = useGetParams();

  return (
    <>
      <Head>
        <title>{`page ${pageNumber}`}</title>
      </Head>
      <Main>{id ? <Card /> : <CardEmpty />}</Main>
    </>
  );
};

export default Pages;
