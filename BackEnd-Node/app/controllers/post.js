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

module.exports = {
    getRecentPosts
};