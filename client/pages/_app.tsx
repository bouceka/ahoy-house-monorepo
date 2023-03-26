import '../styles/globals.scss';
import '../styles/main.scss';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';

import { useApollo } from '../utils/apollo-client';

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
