import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";


export const apolloClient = 
  new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql', credentials: 'same-origin' }),
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