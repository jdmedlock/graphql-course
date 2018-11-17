const Subscription = {
  comment: {
    subscribe(parent, { postId }, { db, pubsub }, info) {
      const post = db.posts.find(post => post.id === postId && post.published);
      if (!post) {
        throw new Error('Post not found. postId=', postId);
      }

      return pubsub.asyncIterator(`comment:${postId}`);
    }
  }
}

export default Subscription;