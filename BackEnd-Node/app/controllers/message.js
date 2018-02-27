var mongoose = require('mongoose');
var Message = mongoose.model('message');

function getRecentMessages(req, res) {
    const postId = req.headers.postid;

    Message
        .find({
            postId: postId
        })
        .populate('userId', ['name'])
        // .limit(10)
        .exec(function (err, messages) {
            if (err) {
                res.send(err);
            }
            res.json(messages);
        });
}

function getMessage(req, res) {
    const postId = req.headers.messageId;

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

    const user_id = req.payload._id;
    const postId = data.postId;
    const messageText = data.messageText;

    var message = new Message({
        userId: user_id,
        postId: postId,
        messageText: messageText
    });

    message.save(function (err) {
        if (err) throw err;

        Message
            .findOne({
                _id: message._id
            })
            .populate('userId', ['name'])
            .exec(function (err, message) {
                if (err) {
                    res.send(err);
                }
                res.json(message);
            });
    });
}

module.exports = {
    getRecentMessages,
    getMessage,
    createMessage
};