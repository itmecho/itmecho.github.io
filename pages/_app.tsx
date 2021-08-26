import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@itmecho/layout/Layout';
import '../styles/globals.css';
import { ThemeContext } from 'context/ThemeContext';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = React.useState(true);

  React.useEffect(() => {
    console.log('darkMode: ' + darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode: () => {
          setDarkMode(!darkMode);
        },
      }}
    >
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <title>itmecho</title>
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContext.Provider>
  );
}
