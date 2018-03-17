const config = require('config');
const express = require('express');
const authentication = require('../controllers/authentication.controller');
const seeder = require('../seedData');

var routes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: EntryPoint
 *     description: Apis to start with
 *   - name: Test
 *     description: Apis for test environment
 */

function setup (auth) {
  if (config.util.getEnv('NODE_ENV') === 'test' || config.util.getEnv('NODE_ENV') === 'dev') {
    /**
     * @swagger
     * /users:
     *   get:
     *     description: Returns all users
     *     tags: [Test]
     *     responses:
     *       200:
     *         description: Returns array of users
     *         schema:
     *          type: array
     *          items:
     *            $ref: '#/definitions/User'
     */
    routes.get('/users/:id?', authentication.getUsers);

    /**
     * @swagger
     * /seed:
     *   get:
     *     description: Clear DB and make initial setup with some seed data
     *     tags: [EntryPoint]
     *     responses:
     *       200:
     *         description: DB Initialised
     */
    routes.get('/seed', seeder.seedDBData);
  }

  return routes;
}

module.exports = {
  setup
};
