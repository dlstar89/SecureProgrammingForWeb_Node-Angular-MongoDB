var mongoose = require('mongoose');
var Message = mongoose.model('message');

function getRecentMessages(req, res) {
    postId = req.headers['postid'];
    console.log(req.headers);
    console.log(postId);
    Message.find({
            postId: postId
        })
        .populate('userId', ['name'])
        // .populate('postId')
        // .sort('title')
        .limit(10)
        .exec(function (err, messages) {
            if (err) {
                res.send(err);
            }
            res.json(messages);
        });
}

function getMessage(req, res) {
    let postId = req.headers['messageId'];

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

function createMessage(req, res) {
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
    getRecentMessages,
    getMessage,
    createMessage
};