let db = require('../db/db');
let Post = db.dbData.model('post');
let Message = db.dbData.model('message');
let logger = require('../logger/loger');

/**
 * Returns most recent messages
 *
 * @param {any} req
 * @param {any} res
 */
function getRecentPosts (req, res) {
  Post
    .find({})
    .populate('userId', ['name'])
    .sort({
      postedOn: -1
    })
    .limit(20)
    .exec()
    .then(posts => {
      return Promise.all([
        posts,
        Message
          .find({
            postId: {
              $in: posts.map(post => {
                return post._id;
              })
            }
          })
          .exec()
      ]);
    })
    .then(function (results) {
      const posts = countPostsMessages(results[0], results[1]);

      res.json(posts);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
}

/**
 * Returns post by its id
 *
 * @param {any} req
 * @param {any} res
 */
function getPost (req, res) {
  const postId = req.headers.postid || req.params.id;

  Post
    .findOne({ _id: postId })
    .populate('userId', ['name'])
    .exec()
    .then(post => {
      res
        .status(200)
        .json(post);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
}

/**
 *Returns all posts for given user id

 * @param {any} req
 * @param {any} res
 */
function getUserPosts (req, res) {
  const _id = req.payload._id;

  Post
    .find({
      userId: _id
    })
    .sort({
      postedOn: -1
    })
    .exec()
    .then(function (posts) {
      return Promise.all([
        posts,
        Message.find({
          postId: {
            $in: posts.map(function (post) {
              return post._id;
            })
          }
        })
          .exec()
      ]);
    })
    .then(function (results) {
      const posts = countPostsMessages(results[0], results[1]);

      // Log user getting recent messages
      logger.createLog({ action: 'User requests their recent posts', code: 200, userId: _id, ip: req.ip });

      res
        .status(200)
        .json(posts);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
}

/**
 * Counts number of messages for each post
 *
 * @param {array} posts
 * @param {array} messages
 *
 * @returns {array} posts
 */
function countPostsMessages (posts, messages) {
  posts.forEach(function (post) {
    post.messages = messages.filter(function (message) {
      // return message.postId.equals(post._id);
      if (message.postId.equals(post._id)) {
        post.totalMessages++;
        if (message.markedAsAnswer === true) {
          post.totalAnswers++;
        }
      }
    });
  });

  return posts;
}

/**
 * Creates new post asociated with user id
 *
 * @param {any} req
 * @property {string} req.body.title
 * @property {string} req.body.shortDescription
 * @property {string} req.body.fullDescription
 *
 * @param {json} res
 */
function createPost (req, res) {
  const data = req.body;

  const userId = req.payload._id;
  const title = data.title;
  const shortDescription = data.shortDescription;
  const fullDescription = data.fullDescription;

  var post = new Post({
    userId: userId,
    title: title,
    shortDescription: shortDescription,
    fullDescription: fullDescription
  });

  post.save(function (err) {
    if (err) throw err;

    res.json(post);
  });
}

module.exports = {
  getRecentPosts,
  getPost,
  getUserPosts,
  createPost
};
