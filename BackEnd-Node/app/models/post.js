let mongoose = require('mongoose');
let Schema = mongoose.Schema;

/**
 * @swagger
 * definitions:
 *   NewPost:
 *     type: object
 *     required:
 *       - author
 *       - title
 *       - shortDescription
 *       - fullDescription
 *     properties:
 *       author:
 *         type: string
 *       title:
 *         type: string
 *       shortDescription:
 *         type: string
 *       fullDescription:
 *         type: string
 *       messages:
 *         type: array
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/NewMessage'
 */

/**
 * @swagger
 * parameters:
 *   title:
 *     type: string
 *     name: title
 *     in: formData
 *     required: true
 *     example: 'Some Title'
 *   shortDescription:
 *     type: string
 *     name: shortDescription
 *     in: formData
 *     required: true
 *     example: 'Short description of the post'
 *   fullDescription:
 *     type: string
 *     name: fullDescription
 *     in: formData
 *     required: true
 *     example: 'Full decription of the post'
 */

var postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
    required: true
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'message',
    required: false
  }],
  totalMessages: {
    type: Number,
    required: false,
    default: 0
  },
  totalAnswers: {
    type: Number,
    required: false,
    default: 0
  }

}, { versionKey: false });

// Export User schema
module.exports = mongoose.model('post', postSchema);
