let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @swagger
 * definitions:
 *   NewMessage:
 *     type: object
 *     required:
 *       - postId
 *       - messageText
 *     properties:
 *       userId:
 *         type: string
 *       postId:
 *         type: string
 *       messageText:
 *         type: string
 */

/**
 * @swagger
 * parameters:
 *   postId:
 *     type: string
 *     name: postId
 *     in: formData
 *     required: true
 *     example: '5a9e82f5ffc41fd603bc09fa'
 *   messageId:
 *     type: string
 *     name: messageId
 *     in: formData
 *     required: true
 *     example: '5a9e82f5ffc41fd603bc09fa'
 *   messageText:
 *     type: string
 *     name: messageText
 *     in: formData
 *     required: true
 *     example: 'Some message for the post'
 *   markedAsAnswer:
 *     type: boolean
 *     name: markedAsAnswer
 *     in: formData
 *     required: true
 *     example: true
 */

let messageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'post',
    required: true
  },
  messageText: {
    type: String,
    required: true
  },
  markedAsAnswer: {
    type: Boolean,
    required: false,
    default: false
  },
  postedOn: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

messageSchema.methods.setAnsweredStatus = function (isAnswered) {
  this.markedAsAnswer = isAnswered;
};

module.exports = mongoose.model('message', messageSchema);
