import Head from 'next/head';
import Layout from './layout';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { isServer } from '@/helpers/isServer';
import type { NextPageWithLayout } from './_app';

const FIRST_PAGE = '/page/1';

const RedirectPage = () => {
  const router = useRouter();
  router.push(FIRST_PAGE);
  return <></>;
};

const Page: NextPageWithLayout = () => {
  return isServer() ? <></> : <RedirectPage />;
};

Page.getLayout = function getLayout(RedirectPage: ReactElement) {
  return (
    <>
      <Head>
        <title>{`Next.js: The Pages Router`}</title>
      </Head>
      <Layout>{RedirectPage}</Layout>
    </>
  );
};

export default Page;
