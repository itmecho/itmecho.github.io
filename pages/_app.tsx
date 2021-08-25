import { useEffect } from "react";
import { JssProvider, createGenerateId } from "react-jss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@itmecho/layout/Layout";
import {
  MantineProvider,
  NormalizeCSS,
  GlobalStyles,
  DeepPartial,
  MantineTheme,
} from "@mantine/core";

const theme: DeepPartial<MantineTheme> = {
  colorScheme: "dark",
  fontFamily: "Open Sans",
};

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  useEffect(() => {
    const jssStyles = document.getElementById("mantine-ssr-styles");
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <JssProvider generateId={createGenerateId()}>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <title>itmecho</title>
        </Head>

        <MantineProvider theme={theme}>
          <NormalizeCSS />
          <GlobalStyles />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </JssProvider>
    </>
  );
}
