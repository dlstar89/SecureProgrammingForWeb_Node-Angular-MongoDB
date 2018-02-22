var mongoose = require('mongoose');
var Post = mongoose.model('post');
var Message = mongoose.model('message');

function getRecentPosts(req, res) {
    Post
        .find({})
        .sort({
            title: 'desc'
        })
        .limit(20)
        .exec()
        .then(function (posts) {
            return Promise.all([
                posts,
                Message
                .find({
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
            var posts = results[0];
            var messages = results[1];
            posts.forEach(function (post) {
                post.messages = messages.filter(function (message) {
                    // return message.postId.equals(post._id);
                    if (message.postId.equals(post._id)) {
                        post.totalMessages++;
                    }
                });
            });

            res.json(posts);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });
}

function getPost(req, res) {
    let postId = req.headers['postid'];

    Post
        .findOne({
            _id: postId
        })
        .populate('author', ['name'])
        .exec(function (err, post) {
            if (err) {
                res.send(err);
            }
            res.json(post);
        });
}

function createPost(req, res) {
    const data = req.body;

    const author_id = req.payload._id;
    const title = data.title;
    const shortDescription = data.shortDescription;

    var post = new Post({
        author: author_id,
        title: title,
        shortDescription: shortDescription
    });

    post.save(function (err) {
        if (err) {
            throw err;
        }

        res.json({
            success: 'OK',
            postId: post._id
        });
    });
}

module.exports = {
    getRecentPosts,
    getPost,
    createPost
};