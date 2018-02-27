var mongoose = require('mongoose');
var User = mongoose.model('user');
var Post = mongoose.model('post');
var Message = mongoose.model('message');

function profileRead(req, res) {
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

module.exports = {
    profileRead,
    getMyPosts
};



// var postIds = posts.map(function (post) {
//     return post._id;
// });

// Message
//     .find({
//         postId: {
//             $in: postIds
//         }
//     })
//     .exec(function (err, messages) {
//         posts.forEach(function (post) {
//             post.messages = messages.filter(function (message) {
//                 return message.postId.equals(post._id);
//             });
//         });
//         res.json(posts);
//     });