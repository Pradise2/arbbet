import { GraphQLClient } from 'graphql-request';

// Use the Development Query URL from your Subgraph Studio dashboard
const SUBGRAPH_URL = 'https://api.studio.thegraph.com/query/121431/arb-bet/version/latest';

// Create and export the GraphQL client instance
export const client = new GraphQLClient(SUBGRAPH_URL);