/**Required packages */
var config = require('./config'); // get our config file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var routes = require('./app/routes/index');
var passport = require('passport');

require('./app/models/db');
require('./app/config/passport');

/**CONFIGURATION */
var port = process.env.PORT || 8080;
mongoose.connect(config.localMongoDB);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


// use morgan to log requests to the console
app.use(morgan('dev'));

// initialize passport
app.use(passport.initialize());

// apply routes to the server
app.use('/api', routes.routes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({
            "message": err.name + ": " + err.message
        });
    }
});

/**Start Server */
app.listen(port);
console.log('Server running on http://localhost:' + port);