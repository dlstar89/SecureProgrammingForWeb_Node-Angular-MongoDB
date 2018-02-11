/**Required packages */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config'); // get our config file

/**CONFIGURATION */
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.localMongoDB); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));


/**ROUTES */
// basic route
app.get("/", (req, res) => res.json({
    message: "Hello! The API is at http://localhost:" + port + "/api"
}));



// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Server running on http://localhost:' + port);