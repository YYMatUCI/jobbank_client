// src/apollo.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

// HTTP connection to the GraphQL API
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Replace with your GraphQL server URL
});

// Cache implementation
const cache = new InMemoryCache();

// Create the Apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;
