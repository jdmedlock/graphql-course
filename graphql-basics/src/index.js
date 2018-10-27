import { GraphQLServer } from 'graphql-yoga';

// GraphQL Type Definitions (schema)
const typeDefs = `
  type Query {
    hello: String!
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    hello() {
      return 'Hello';
    }
  }
};

//
const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up and running!');
});