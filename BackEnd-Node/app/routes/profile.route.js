const express = require('express');
var routes = express.Router();
const profile = require('../controllers/profile.controller');

/**
 * @swagger
 * tags:
 *   - name: Profile
 *     description: Gets user profile
 */

function setup (auth) {
  /**
   * @swagger
   * /profile:
   *   get:
   *     security:
   *       - Bearer: ['#/securityDefinitions/Bearer']
   *     description: Get user profile
   *     tags: [Profile]
   *     responses:
   *       200:
   *         description: Returns user profile
   *         schema:
   *          type: object
   *          $ref: '#/definitions/User'
   */
  routes.get('/profile', auth, profile.profileRead);

  return routes;
}

module.exports = {
  setup
};
