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

// Test data - Posts
const posts = [{
  id: '1',
  title: 'Last day on current gig',
  body: 'Just finished my current contracting gig yesterday and am looking for the next one!',
  published: true,
  author: '1'
}, {
  id: '2',
  title: 'Anyone have a Cannondale bike for sale',
  body: 'Looking for a reasonably priced Cannondate trail bike in good condition.',
  published: true,
  author: '2'
}, {
  id: '3',
  title: 'My posts are sooooo boring',
  body: 'I just fell asleep reading my own posts!',
  published: false,
  author: '3'
}];

// GraphQL Type Definitions (schema)
const typeDefs = `
  type Query {
    me: User!
    post: Post!
    posts(query: String): [Post!]!
    users(query: String): [User!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
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
      return posts[0];
    },

    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts;
      }
      return posts.filter(post => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },

    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
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