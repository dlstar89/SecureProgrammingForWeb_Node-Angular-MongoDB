const config = require('config');
const jwt = require('express-jwt');

// jwt for endpoints that are protected by authentication
const auth = jwt({
  secret: config.jwtSecret,
  userProperty: 'payload'
});

const baseApi = '/api';

const routes = [
  './authentication.route',
  './profile.route',
  './post.route',
  './message.route',

  './_swagger.route'
];

if (config.util.getEnv('NODE_ENV') === 'test' || config.util.getEnv('NODE_ENV') === 'dev') {
  routes.push('./_test.r');
}

function setup (app) {
  /**
   * @swagger
   * /:
   *   get:
   *     description: Basic check if server is alive
   *     tags: [EntryPoint]
   *     responses:
   *       200:
   *         description: IM AM ALIVE!!!
   */
  app.get(baseApi + '/', (req, res) => res.json({
    // message: "Hello! The API is at http://localhost:" + port + "/api"
    message: 'IM AM ALIVE!!!'
  }));

  // Setup all routes
  routes.forEach(element => {
    app.use(baseApi, require(element).setup(auth));
  });
}

module.exports = { setup };
