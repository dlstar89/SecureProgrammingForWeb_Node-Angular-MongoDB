let config = require('config');
let morgan = require('morgan');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let cors = require('cors');
// let sanitizer = require('./app/middleware/sanitizer');
let passport = require('passport');

// initializes mongoose models
require('../models/_models');

// initiazlie passport configuration
require('../passportconfig/passport');

function setup (app) {
  // initialize passport
  app.use(passport.initialize());

  // Use in memory mongo database for tests to avoid creating new mongodb instance
  if (config.util.getEnv('NODE_ENV') === 'test') {
    let Mockgoose = require('mockgoose').Mockgoose;
    let mockgoose = new Mockgoose(mongoose);
    mockgoose.prepareStorage().then(function () {
      mongoose.connect(config.mongoDB);
    });
  } else {
    mongoose.connect(config.mongoDB);
  }

  // use morgan to log requests to the console
  if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('dev'));
  }

  // use body parser so we can get data from api body payload
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());

  // apply CORS
  app.use(cors());

  // register SWAGGER route
  app.use(require('../routes/swagger').routes);
}

module.exports = {
  setup
};
