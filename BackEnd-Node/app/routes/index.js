var config = require('../../config');
var express = require('express');
var jwt = require('express-jwt');

let seeder = require('../seedData');

var authentication = require('../controllers/authentication');
var profile = require('../controllers/profile');

var routes = express.Router();

var auth = jwt({
    secret: config.jwtSecret,
    userProperty: 'payload'
});

routes.get("/", (req, res) => res.json({
    // message: "Hello! The API is at http://localhost:" + port + "/api"
    message: "Hello from API!"
}));

routes.get('/setup', seeder.seedDBData);
routes.get("/users/:id?", auth, authentication.getUsers);
routes.post("/login", authentication.loginUser);
routes.get('/profile', auth, profile.profileRead);




module.exports = {
    routes
};