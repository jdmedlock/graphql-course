import { GraphQLServer } from 'graphql-yoga';

// Test data - Users
const users = [{
  id: '1',
  name: 'Jim',
  email: 'jim@me.com',
  age: 63
}, {
  id: '2',
  name: 'Joey',
  email: 'joey@me.com',
  age: 24
}, {
  id: '3',
  name: 'Kay',
  email: 'kay@me.com'
}];

// GraphQL Type Definitions (schema)
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    users: [User!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '123ABD',
        name: 'John Doe',
        email: 'jdoe@me.com',
      };
    },
    post() {
      return {
        id: '123ABD',
        title: 'Southern Culture on the Skids',
        body: 'Love this band',
        published: false
      };
    },
    users(parent, args, ctx, info) {
      return users;
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