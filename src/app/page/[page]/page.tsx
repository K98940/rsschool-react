import { Metadata } from 'next';
import { Main } from '@/components/main/main';
import CardEmpty from '@/components/cardEmpty/cardEmpty';

type Props = {
  params: { page: string; episode: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = params;
  const title = `page ${page}`;
  return {
    title,
  };
}

const Page = async ({ params, searchParams }: Props) => {
  return (
    <>
      <Main params={params} searchParams={searchParams}>
        <CardEmpty />
      </Main>
    </>
  );
};

export default Page;
