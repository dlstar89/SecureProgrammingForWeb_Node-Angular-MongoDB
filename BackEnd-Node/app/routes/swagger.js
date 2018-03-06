const config = require('config');
const express = require('express');
var routes = express.Router();

let swaggerUi = require('swagger-ui-express');
let swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
var swaggerDefinition = {
    info: { // API informations (required)
        title: 'Job Posting API', // Title (required)
        version: '1.0.0', // Version (required)
        description: 'API', // Description (optional)
    },
    host: 'localhost:8080', // Host (optional)
    basePath: '/api', // Base path (optional)
};

// Options for the swagger docs
var options = {
    // Import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // Path to the API docs
    apis: [
        // __dirname + '/parameters.yaml',
        __dirname + '/index.js',
        __dirname + '/../models/*.js'
    ],
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

module.exports = {
    routes
};