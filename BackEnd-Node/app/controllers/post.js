var mongoose = require('mongoose');
var Post = mongoose.model('post');

function getRecentPosts(req, res) {
    Post.find({})
        .populate('author', ['name'])
        // .sort('title')
        .limit(20)
        .exec(function (err, posts) {
            if (err) {
                res.send(err);
            }
            res.json(posts);
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

    const _id = req.payload._id;
    const title = data.title;
    const description = data.description;

    var post = new Post({
        author: _id,
        title: title,
        description: description
    });

    post.save(function (err) {
        if (err) throw err;

        res.json({
            success: 'OK'
        });
    });
}

module.exports = {
    getRecentPosts,
    getPost,
    createPost
};