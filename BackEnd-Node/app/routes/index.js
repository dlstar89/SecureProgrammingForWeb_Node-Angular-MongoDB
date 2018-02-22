var config = require('../../config');
var express = require('express');
var jwt = require('express-jwt');

var authentication = require('../controllers/authentication');
var profile = require('../controllers/profile');
var post = require('../controllers/post');
var message = require('../controllers/message');

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
routes.get("/users/:id?", authentication.getUsers);
routes.get('/setup', seeder.seedDBData);

routes.get('/getRecentPosts', post.getRecentPosts);
routes.get('/getPost/:id?', post.getPost);

routes.get('/getRecentMessages', message.getRecentMessages);
routes.get('/getMessage/:id?', message.getMessage);

routes.get('/profile', auth, profile.profileRead);
routes.get('/getMyPosts', auth, profile.getMyPosts);

/**POST */
routes.post("/login", authentication.loginUser);
routes.post("/register", authentication.registerUser);

routes.post("/createpost", auth, post.createPost);




module.exports = {
    routes
};