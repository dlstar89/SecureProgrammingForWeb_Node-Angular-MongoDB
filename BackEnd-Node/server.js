/**Required packages */
let config = require('./config'); // get our config file
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let cors = require('cors');
let morgan = require('morgan');
let mongoose = require('mongoose');
let passport = require('passport');
let sanitizer = require('./app/middleware/sanitizer');

// initializes mongoose models
require('./app/models/db');

//initiazlie passport configuration
require('./app/config/passport');

/**Routes Imports */
let routes = require('./app/routes/index');

/**CONFIGURATION */
var port = process.env.PORT || 8080;
mongoose.connect(config.localMongoDB);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(cors());

// use morgan to log requests to the console
app.use(morgan('dev'));

// initialize passport
app.use(passport.initialize());

// apply routes to the server
app.use('/api', routes.routes);

app.use(function (err, req, res, next) {
    // if (err.name === 'UnauthorizedError') {
    if (err.status === 401) {
        res.status(err.status);
        res.json({
            "message": err.name + ": " + err.message
        });
    }
});

/**Start Server */
app.listen(port);
console.log('Server running on http://localhost:' + port);