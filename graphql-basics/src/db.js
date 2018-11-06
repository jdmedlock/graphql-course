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

const db = {
  users,
  posts,
  comments
};

export default db;