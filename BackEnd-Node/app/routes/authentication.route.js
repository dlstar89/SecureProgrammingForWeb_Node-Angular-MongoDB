const express = require('express');
const authentication = require('../controllers/authentication.controller');
var routes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication
 */

function setup (auth) {
  /**
   * @swagger
   * /register:
   *   post:
   *     description: Login to the application
   *     tags:
   *       - Authentication
   *     consumes:
   *       - application/x-www-form-urlencoded
   *     produces:
   *       - application/json
   *     parameters:
   *       - $ref: '#/parameters/name'
   *       - $ref: '#/parameters/email'
   *       - $ref: '#/parameters/password'
   *     responses:
   *       200:
   *         description: Returns token
   *         schema:
   *          $ref: '#/definitions/Token'
   *       999:
   *         description: email already used by other user
   */
  routes.post('/register', authentication.registerUser);

  /**
   * @swagger
   * /login:
   *   post:
   *     description: Login to the application
   *     tags: [Authentication]
   *     produces:
   *       - application/json
   *     parameters:
   *       - $ref: '#/parameters/email'
   *       - $ref: '#/parameters/password'
   *     responses:
   *       200:
   *         description: returns token
   *         schema:
   *          $ref: '#/definitions/Token'
   */
  routes.post('/login', authentication.loginUser);

  return routes;
}

module.exports = {
  setup
};
