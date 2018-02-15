var config = require('../../config');
var express = require('express');
var jwt = require('express-jwt');

var authentication = require('../controllers/authentication');
var profile = require('../controllers/profile');
var post = require('../controllers/post');

let seeder = require('../seedData');

var routes = express.Router();

var auth = jwt({
    secret: config.jwtSecret,
    userProperty: 'payload'
});

routes.get("/", (req, res) => res.json({
    // message: "Hello! The API is at http://localhost:" + port + "/api"
    message: "Hello from API!"
}));

/**GET */
routes.get('/setup', seeder.seedDBData);
routes.get("/users/:id?", authentication.getUsers);
routes.get('/profile', auth, profile.profileRead);
routes.get('/getRecentPosts',post.getRecentPosts);

/**POST */
routes.post("/login", authentication.loginUser);
routes.post("/register", authentication.registerUser);




module.exports = {
    routes
};