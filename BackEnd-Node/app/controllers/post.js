var mongoose = require('mongoose');
var Post = mongoose.model('post');
var Message = mongoose.model('message');

function getRecentPosts(req, res) {
    Post
        .find({})
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
            var posts = results[0];
            var messages = results[1];
            posts.forEach(function (post) {
                post.messages = messages.filter(message => {
                    // return message.postId.equals(post._id);
                    if (message.postId.equals(post._id)) {
                        post.totalMessages++;
                    }
                });
            });

            res.json(posts);
        })
        .catch(function (err) {
            console.error(err);
            res.json(err);
        });
}

function getPost(req, res) {
    const postId = req.headers.postid || req.params.id;

    Post
        .findOne({
            _id: postId
        })
        .populate('author', ['name'])
        .exec()
        .then(post => {
            res.json(post);
        })
        .catch(function (err) {
            console.error(err);
            res.json(err);
        });
}

function getUserPosts(req, res) {
    const _id = req.payload._id;

    Post
        .find({
            author: _id
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
                }).exec()
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

function createPost(req, res) {
    const data = req.body;

    const author_id = req.payload._id;
    const title = data.title;
    const shortDescription = data.shortDescription;
    const fullDescription = data.fullDescription;


    var post = new Post({
        author: author_id,
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