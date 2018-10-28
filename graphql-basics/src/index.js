import { GraphQLServer } from 'graphql-yoga';

// GraphQL Type Definitions (schema)
const typeDefs = `
  type Query {
    post: Post!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    post() {
      return {
        id: '123ABD',
        title: 'Southern Culture on the Skids',
        body: 'Love this band',
        published: false
      };
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