const express = require('express');

const post = require('../controllers/post.controller');
var routes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Posts
 *     description: Posts
 */

function setup (auth) {
  /**
   * @swagger
   * /getrecentposts:
   *   get:
   *     description: Gets most recetn posts
   *     tags: [Posts]
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *          type: array
   *          items:
   *            $ref: '#/definitions/NewPost'
   */
  routes.get('/getRecentPosts', post.getRecentPosts);

  /**
   * @swagger
   * /getPost/{id}:
   *   get:
   *     description: Gets post by id
   *     tags: [Posts]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Post id
   *         in: path
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: OK
   *         schema:
   *          $ref: '#/definitions/NewPost'
   */
  routes.get('/getPost/:id?', post.getPost);

  /**
   * @swagger
   * /getUserPosts:
   *   get:
   *     security:
   *       - Bearer: ['#/securityDefinitions/Bearer']
   *     description: Gets post by id
   *     tags: [Posts]
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         schema:
   *          type: array
   *          items:
   *            $ref: '#/definitions/NewPost'
   */
  routes.get('/getUserPosts', auth, post.getUserPosts);

  /**
   * @swagger
   * /createPost:
   *   post:
   *     security:
   *       - Bearer: ['#/securityDefinitions/Bearer']
   *     description: Create new post
   *     tags: [Posts]
   *     produces:
   *       - application/json
   *     parameters:
   *       - $ref: '#/parameters/title'
   *       - $ref: '#/parameters/shortDescription'
   *       - $ref: '#/parameters/fullDescription'
   *     responses:
   *       200:
   *         schema:
   *           $ref: '#/definitions/NewPost'
   */
  routes.post('/createpost', auth, post.createPost);

  /**
   * @swagger
   * /deletePost:
   *   delete:
   *     security:
   *       - Bearer: ['#/securityDefinitions/Bearer']
   *     description: Delete post
   *     tags: [Posts]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         description: Post id
   *         in: header
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         schema:
   *           $ref: '#/definitions/NewPost'
   */
  routes.delete('/deletePost', auth, post.deletePost);

  return routes;
}

module.exports = {
  setup
};
