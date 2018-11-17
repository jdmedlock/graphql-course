import uuidv4 from 'uuid/v4';

const Mutation = {
  // Comment Mutations
  createComment(parent, args, { db, pubsub }, info) {
    const authorExists = db.users.some(user => user.id === args.data.author);
    if (!authorExists) {
      throw new Error('Author user id not found');
    }

    const postExists = db.posts.some(post => {
      return post.id === args.data.post && post.published;
    });
    if (!postExists) {
      throw new Error('Post id not found');
    }

    const comment = {
      id: uuidv4(),
      ...args.data
    };

    db.comments.push(comment);
    pubsub.publish(`comment:${args.data.post}`, { comment: comment });
    return comment;
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find(comment => comment.id === id);
    if (!comment) {
      throw new Error('Comment not found. id: ', id);
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }

    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    const commentIndex = db.comments.findIndex(comment => comment.id === args.id);
    if (commentIndex === -1) {
      throw new Error('Comment not found. id: ', args.id);
    }
    const deletedComments = db.comments.splice(commentIndex, 1);

    return deletedComments[0];
  },

  // Post Mutations
  createPost(parent, args, { db }, info) {
    const userExists = db.users.some(user => user.id === args.data.author);
    if (!userExists) {
      throw new Error('User doesn\'t exist');
    }

    const post = {
      id: uuidv4(),
      ...args.data
    };
    db.posts.push(post);
    return post;
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find(post => post.id === id);
    if (!post) {
      throw new Error('Post not found. id: ', id);
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }
    if (typeof data.body === 'string') {
      post.body = data.body;
    }
    if (typeof data.published === 'boolean') {
      post.published = data.published;
    }
    return post;
  },
  deletePost(parent, args, { db }, info) {
    const postIndex = db.posts.findIndex(post => post.id === args.id);
    if (postIndex === -1) {
      throw new Error('Post not found. id: ', args.id);
    }
    const deletedPosts = db.posts.splice(postIndex, 1);
    comments = db.comments.filter(comment => comment.post !== args.id);
    return deletedPosts[0];
  },

  // User mutations
  createUser(parent, args, { db }, info) {
    const emailTaken = db.users.some(user => user.email === args.data.email);

    if (emailTaken) {
      throw new Error('Email already taken');
    }

    const user = {
      id: uuidv4(),
      ...args.data
    };

    db.users.push(user);
    return user;
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    const user = db.users.find(user => user.id === id);
    if (!user) {
      throw new Error('User not found. id: ', id);
    }
    if (typeof data.email === 'string') {
      const isEmailTaken = db.users.some(user => user.email === data.email)
      if (isEmailTaken) {
        throw new Error('email already taken. id: ', id);
      }
      user.email = data.email;
    }
    if (typeof data.name === 'string') {
      user.name = data.name;
    }
    if (typeof data.age !== 'undefined') {
      user.age = data.age;
    }
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id);
    if (userIndex === -1) {
      throw new Error('User not found. id: ', args.id);
    }
    const deletedUsers = db.users.splice(userIndex, 1);
    posts = db.posts.filter(post => {
      const match = post.author === args.id;
      if (match) {
        comments = db.comments.filter(comment => comment.post !== post.id);
      }
      return !match;
    });
    comments = db.comments.filter(comment => comment.author !== args.id);
    return deletedUsers[0];
  }
};

export default Mutation;