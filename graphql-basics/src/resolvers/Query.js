const Query = {
  me() {
    return {
      id: '123ABD',
      name: 'John Doe',
      email: 'jdoe@me.com',
    };
  },

  comments() {
    return db.comments;
  },

  post() {
    return db.posts[0];
  },

  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }
    return db.posts.filter(post => {
      return (
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    });
  },

  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter(user => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  }
};

export default Query;