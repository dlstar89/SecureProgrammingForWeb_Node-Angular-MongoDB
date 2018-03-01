const config = require('config');
const express = require('express');
const jwt = require('express-jwt');

const authentication = require('../controllers/authentication');
const profile = require('../controllers/profile');
const post = require('../controllers/post');
const message = require('../controllers/message');

const seeder = require('../seedData');

var routes = express.Router();

const auth = jwt({
    secret: config.jwtSecret,
    userProperty: 'payload'
});

routes.get("/", (req, res) => res.json({
    // message: "Hello! The API is at http://localhost:" + port + "/api"
    message: "Hello from API!"
}));

/**GET */

if (config.util.getEnv('NODE_ENV') === 'dev' || config.util.getEnv('NODE_ENV') === 'test') {
    routes.get("/users/:id?", authentication.getUsers);
    routes.get('/setup', seeder.seedDBData);
}

//Profile
routes.get('/profile', auth, profile.profileRead);

//Post
routes.get('/getRecentPosts', post.getRecentPosts);
routes.get('/getPost/:id?', post.getPost);
routes.get('/getUserPosts', auth, post.getUserPosts);

//Message
routes.get('/getRecentMessages', message.getRecentMessages);
routes.get('/getMessage/:id?', message.getMessage);

/*=============================================================*/
/**POST */
//Authentication
routes.post("/register", authentication.registerUser);
routes.post("/login", authentication.loginUser);

//Post
routes.post("/createpost", auth, post.createPost);

//Message
routes.post("/postmessage", auth, message.createMessage);


module.exports = {
    routes
};