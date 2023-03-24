import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';
import { createUploadLink } from 'apollo-upload-client';

export const apolloClient = new ApolloClient({
  link: createUploadLink({
    uri: 'https://ahoy-house-server-21666.nodechef.com/graphql', //http://localhost:3000/graphql
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network', // before send req check cache
    },
  },
});

//
export function useApollo() {
  const client = useMemo(() => apolloClient, []);
  return client;
}
