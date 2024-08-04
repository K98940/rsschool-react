import { Metadata } from 'next';
import { Suspense } from 'react';
import { Main } from '@/components/main/main';
import { Card } from '@/components/card/card';
import { getEpisode } from '@/api/getEpisode';
import EpisodeSkeleton from '@/components/skeletones/episodeSkeleton/episodeSkeleton';

type MetadataProps = {
  params: { page: string; episode: string };
};

type Props = {
  params: { page: string; episode: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { page, episode: id } = params;
  const response = await getEpisode(id);
  const episode = response?.episode;
  let title = `page ${page}`;
  if (episode?.title) title += ` : ${episode.title}`;
  return {
    title,
  };
}

const Page = async ({ params, searchParams }: Props) => {
  const episodeId = params.episode;
  const { page } = params;

  return (
    <>
      <Main params={params} searchParams={searchParams}>
        <Suspense fallback={<EpisodeSkeleton />}>
          <Card episodeId={episodeId} page={page} searchParams={searchParams} />
        </Suspense>
      </Main>
    </>
  );
};

export default Page;
