import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class _Document extends Document {
  render() {
    return (
      <Html className="dark">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Expletus+Sans&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-gray-800 text-black duration-150 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
