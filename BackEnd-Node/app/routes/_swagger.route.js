const config = require('config');
const path = require('path');
const express = require('express');
var routes = express.Router();
let swaggerUi = require('swagger-ui-express');
let swaggerJSDoc = require('swagger-jsdoc');

/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

function setup (auth) {
  // Swagger definition
  // You can set every attribute except paths and swagger
  // https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
  var swaggerDefinition = {
    info: { // API informations (required)
      title: 'Job Posting API', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'API' // Description (optional)
    },
    host: 'localhost:8080', // Host (optional)
    basePath: '/api' // Base path (optional)
  };

  var swaggerApis = [
    returnFullPath('./authentication.route.js'),
    returnFullPath('./profile.route.js'),
    returnFullPath('./post.route.js'),
    returnFullPath('./message.route.js'),

    returnFullPath('./_swagger.route.js'),

    // returnFullPath('/*route.js'),
    returnFullPath('/../models/*.js')
  ];

  if (config.util.getEnv('NODE_ENV') === 'test' || config.util.getEnv('NODE_ENV') === 'dev') {
    swaggerApis.unshift(returnFullPath('/_test.r.js'));
  }

  swaggerApis.unshift(returnFullPath('./_routes.js'));

  // Options for the swagger docs
  var options = {
    // Import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // Path to the API docs
    apis: swaggerApis,
    explorer: false
  };

  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  var swaggerSpec = swaggerJSDoc(options);

  // console.log(swaggerSpec);
  routes.get('/api-docs.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // app.use('/api/v1', routes.routes);

  return routes;
}

function returnFullPath (_path) {
  return path.join(__dirname, _path);
}

module.exports = {
  setup
};
