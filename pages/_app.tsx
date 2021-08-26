import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@itmecho/layout/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>itmecho</title>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
