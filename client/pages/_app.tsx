import '../styles/globals.scss';
import '../styles/main.scss';
import type { AppProps } from 'next/app';
import { useApollo } from '../utils/apollo-client';
import { ApolloProvider } from '@apollo/client';

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
