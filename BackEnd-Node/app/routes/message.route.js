const express = require('express');
const message = require('../controllers/message.controller');
var routes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Messages
 *     description: API Ednpoints for Messages
 */

function setup (auth) {
  /**
   * @swagger
   * /getRecentMessages:
   *   get:
   *     description: Gets Messages for the Post
   *     tags: [Messages]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: postid
   *         description: Post id
   *         in: header
   *         required: true
   *         type: string
   *         example: '5a9e808fffc41fd603bc09f5'
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *          type: array
   *          items:
   *            $ref: '#/definitions/NewMessage'
   */
  routes.get('/getRecentMessages', message.getRecentMessages);

  /**
   * @swagger
   * /postMessage:
   *   post:
   *     security:
   *       - Bearer: ['#/securityDefinitions/Bearer']
   *     description: Create new post
   *     tags: [Messages]
   *     produces:
   *       - application/json
   *     parameters:
   *       - $ref: '#/parameters/postId'
   *       - $ref: '#/parameters/messageText'
   *     responses:
   *       200:
   *         schema:
   *           $ref: '#/definitions/NewMessage'
   */
  routes.post('/postmessage', auth, message.createMessage);

  /**
   * @swagger
   * /markAnsweredStatus:
   *   put:
   *     security:
   *       - Bearer: ['#/securityDefinitions/Bearer']
   *     description: Mark message as answered or not
   *     tags: [Messages]
   *     produces:
   *       - application/json
   *     parameters:
   *       - $ref: '#/parameters/messageId'
   *       - $ref: '#/parameters/markedAsAnswer'
   *     responses:
   *       200:
   *         schema:
   *           $ref: '#/definitions/NewMessage'
   *       321:
   *         description: Message not found with give _id
   */
  routes.put('/markAnsweredStatus', auth, message.markMessageAnsweredStatus);

  return routes;
}

module.exports = {
  setup
};
