var mongoose = require('mongoose');
var User = mongoose.model('user');
var Post = mongoose.model('post');

function profileRead(req, res) {
    // console.log(req);
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnauthorizedError: private profile"
        });
    } else {
        // Otherwise continue
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                res.status(200).json(user);
            });
    }
}

function getMyPosts(req, res) {
    const _id = req.payload._id;

    Post
        .find({
            author: _id
        })
        .sort({
            title: 'desc'
        })
        .exec(function (err, posts) {
            res.json(posts);
        });
}

module.exports = {
    profileRead,
    getMyPosts
};