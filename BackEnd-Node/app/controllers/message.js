var mongoose = require('mongoose')
var Message = mongoose.model('message')

/**
 * Returns all messages for given post id
 * @param {json} req
 * @param {json} res
 */
function getRecentMessages (req, res) {
  const postId = req.headers.postid

  Message
    .find({
      postId: postId
    })
    .populate('userId', ['name'])
  // .limit(10)
    .exec(function (err, messages) {
      if (err) {
        res.send(err)
      }
      res.json(messages)
    })
}

/**
 * Creates new message associated with post id
 * @param {json} req
 * @param {json} res
 */
function createMessage (req, res) {
  const data = req.body

  const userid = req.payload._id
  const postId = data.postId
  const messageText = data.messageText

  var message = new Message({
    userId: userid,
    postId: postId,
    messageText: messageText
  })

  message.save(function (err) {
    if (err) throw err

    Message
      .findOne({
        _id: message._id
      })
      .populate('userId', ['name'])
      .exec(function (err, message) {
        if (err) {
          res.send(err)
        }
        res.json(message)
      })
  })
}

module.exports = {
  getRecentMessages,
  createMessage
}
