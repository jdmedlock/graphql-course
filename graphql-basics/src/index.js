import { GraphQLServer } from 'graphql-yoga';

// Test date - Comments
const comments = [{
  id: '1',
  text: 'This is an awesome comment',
  author: '3',
  post: '3'
}, {
  id: '2',
  text: 'Acutally, this comment is way more awesome than the first.',
  author: '2',
  post: '2',
}, {
  id: '3',
  text: 'This last comment is stupendously, mega awesome!!!',
  author: '2',
  post: '2'
}, {
  id: '4',
  text: 'That was not the last comment and this one is the Mother of All comments!',
  author: '1',
  post: '1'
}];

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
    comments: [Comment!]!
    me: User!
    post: Post!
    posts(query: String): [Post!]!
    users(query: String): [User!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
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

    comments() {
      return comments;
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
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post;
      });
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  User: {
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    },
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