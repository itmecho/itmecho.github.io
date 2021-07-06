import type { AppProps } from 'next/app'
import 'tailwindcss/tailwindcss.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
