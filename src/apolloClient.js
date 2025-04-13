import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql", //env me qit
  cache: new InMemoryCache(),
});

export default client;
