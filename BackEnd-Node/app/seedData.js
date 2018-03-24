var mongoose = require('mongoose');
let Authorization = mongoose.model('authorisation');
let User = mongoose.model('user');
let Post = mongoose.model('post');
let Message = mongoose.model('message');

function createAuthorizations () {
  let authorisations = [
    {
      authName: 'Normal',
      authLevel: 111
    },
    {
      authName: 'Admin',
      authLevel: 777
    }
  ];

  return Authorization.create(authorisations);
}

function createUsers (results) {
  let authorisations = results;

  let admin = {
    email: 'a@a.aa',
    name: 'Admin Admin',
    password: 'Pass1234!',
    authorisation: [authorisations[1]]// admin
  };

  let user1 = {
    email: 'b@b.bb',
    name: 'Bob Bobovich',
    password: 'Pass1234!'
  };

  return User.create([user1, admin]);
}

function createPosts (results) {
  let users = results;
  let p1 = users[0];
  var posts = [];
  for (var i = 1; i < 5; i++) {
    posts.push({
      userId: p1._id,
      title: `${p1.name} Job ${i}`,
      shortDescription: `Some description for Job ${i}`,
      fullDescription: `Full description for Job ${i}`
    });
  }

  return Promise.all([users, Post.create(posts)]);
}

function createMessages (results) {
  let usr1 = results[0][0];
  let posts = results[1];

  var messages = [];
  for (var p = 0; p < posts.length; p++) {
    let post = posts[p];
    messages.push({
      userId: usr1._id,
      postId: post._id,
      messageText: `This is a message #${p}`,
      markedAsAnswer: p % 2 === 0
    });
  }
  return Promise.all([Message.create(messages)]);
}

function seedDBData (req, res) {
  User.collection.drop();
  Post.collection.drop();
  Message.collection.drop();
  Authorization.collection.drop();

  createAuthorizations()
    .then(results => {
      return createUsers(results);
    })
    .then(results => {
      return createPosts(results);
    })
    .then(results => {
      return createMessages(results);
    })
    .then(() => {
      console.log('DB Seeded!');
      res.json({
        success: true
      });
    });
}

module.exports = {
  seedDBData
};
