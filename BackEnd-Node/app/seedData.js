var mongoose = require('mongoose');
let User = mongoose.model('user');
let Post = mongoose.model('post');
let Message = mongoose.model('message');

function seedDBData (req, res) {
  User.collection.drop();
  Post.collection.drop();
  Message.collection.drop();

  var p1 = new User({
    email: 'a@b.ab',
    name: 'Bob Bobovich',
    password: 'Pass1234!'
  });
  p1.save(function (err) {
    if (err) throw err;
    for (var i = 0; i < 3; i++) {
      let num = (i + 1);
      var post = new Post({
        userId: p1._id,
        title: `Bob Job ${num}`,
        shortDescription: `Some description for Job ${num}`,
        fullDescription: `Full description for Job ${num}`
      });
      post.save(function (err) {
        if (err) throw err;
        new Message({
          userId: p1._id,
          postId: post._id,
          messageText: `This is a message #${num}`,
          markedAsAnswer: num % 2 === 0
        })
          .save(function (err) {
            if (err) throw err;
          });
      });
    }
  });

  var p2 = new User({
    email: 'c@d.cd',
    name: 'Dakon Drago',
    password: 'pass2'
  });
  p2.save(function (err) {
    if (err) throw err;
    for (var i = 0; i < 3; i++) {
      let num = (i + 1);
      new Post({
        userId: p2._id,
        title: `Dakon Job ${num}`,
        shortDescription: `Some description for Job ${num}`,
        fullDescription: `Full description for Job ${num}`
      })
        .save(function (err) {
          if (err) throw err;
        });
    }
  });

  console.log('DB Seeded!');
  res.json({
    success: true
  });
}

module.exports = {
  seedDBData
};
