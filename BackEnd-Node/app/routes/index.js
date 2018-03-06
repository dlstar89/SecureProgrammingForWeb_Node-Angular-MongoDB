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

/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */

/**
 * @swagger
 * tags:
 *   - name: EntryPoint
 *     description: Apis to start with
 *   - name: Authentication
 *     description: Authentication
 *   - name: Users
 *     description: Users
 *   - name: Posts
 *     description: Posts
 *   - name: Messages
 *     description: Messages
 */

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns simple text
 *     tags: [EntryPoint]
 *     responses:
 *       200:
 *         description: Hello from API!
 */
routes.get("/", (req, res) => res.json({
    // message: "Hello! The API is at http://localhost:" + port + "/api"
    message: "Hello from API!"
}));


//**Extra APIS for DEV environment */
if (config.util.getEnv('NODE_ENV') === 'dev' || config.util.getEnv('NODE_ENV') === 'test') {
    /**
     * @swagger
     * /users:
     *   get:
     *     description: Returns all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Returns array of users
     *         schema:
     *          type: array
     *          items:
     *            $ref: '#/definitions/User'
     */
    routes.get("/users/:id?", authentication.getUsers);

    /**
     * @swagger
     * /setup:
     *   get:
     *     description: Clear Db and make initial setup
     *     tags: [EntryPoint]
     *     responses:
     *       200:
     *         description: DB Initialised
     */
    routes.get('/setup', seeder.seedDBData);
}

//Profile
// security:
// - Bearer: []

/**
 * @swagger
 * /profile:
 *   get:
 *     security:
 *       - Bearer: ['#/securityDefinitions/Bearer']
 *     description: Get user profile
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Returns user profile
 *         schema:
 *          type: object
 *          $ref: '#/definitions/User'
 */
routes.get('/profile', auth, profile.profileRead);

//Post
/**
 * @swagger
 * /getrecentposts:
 *   get:
 *     description: Gets most recetn posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/NewPost'
 */
routes.get('/getRecentPosts', post.getRecentPosts);

/**
 * @swagger
 * /getPost/{id}:
 *   get:
 *     description: Gets post by id
 *     tags: [Posts]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Post id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *          $ref: '#/definitions/NewPost'
 */
routes.get('/getPost/:id?', post.getPost);

/**
 * @swagger
 * /getUserPosts:
 *   get:
 *     security:
 *       - Bearer: ['#/securityDefinitions/Bearer']
 *     description: Gets post by id
 *     tags: [Posts, Users]
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/NewPost'
 */
routes.get('/getUserPosts', auth, post.getUserPosts);

//Message
/**
 * @swagger
 * /getRecentMessages:
 *   get:
 *     description: Gets Messages for the Post
 *     tags: [Messages]
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: postid
 *         description: Post id
 *         in: header
 *         required: true
 *         type: string
 *         example: '5a9e808fffc41fd603bc09f5'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *          type: array
 *          items:
 *            $ref: '#/definitions/NewMessage'
 */
routes.get('/getRecentMessages', message.getRecentMessages);

routes.get('/getMessage/:id?', message.getMessage);

/*=============================================================*/
/*POST */
//Authentication
/**
 * @swagger
 * /register:
 *   post:
 *     description: Login to the application
 *     tags: [Users, Authentication]
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
routes.post("/register", authentication.registerUser);

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login to the application
 *     tags: [Users, Authentication]
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
routes.post("/login", authentication.loginUser);

/**
 * @swagger
 * /createPost:
 *   post:
 *     security:
 *       - Bearer: ['#/securityDefinitions/Bearer']
 *     description: Create new post
 *     tags: [Posts, Users]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/title'
 *       - $ref: '#/parameters/shortDescription'
 *       - $ref: '#/parameters/fullDescription'
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/definitions/NewPost'
 */
routes.post("/createpost", auth, post.createPost);

/**
 * @swagger
 * /postMessage:
 *   post:
 *     security:
 *       - Bearer: ['#/securityDefinitions/Bearer']
 *     description: Create new post
 *     tags: [Posts, Messages]
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/postId'
 *       - $ref: '#/parameters/messageText'
 *     responses:
 *       200:
 *         schema:
 *           $ref: '#/definitions/NewMessage'
 */
routes.post("/postmessage", auth, message.createMessage);


module.exports = {
    routes
};