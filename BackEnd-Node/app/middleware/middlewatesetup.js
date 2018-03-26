let config = require('config');
let morgan = require('morgan');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let cors = require('cors');
var helmet = require('helmet');
let passport = require('passport');

require('../models/_models'); // Initializes mongoose models
require('../passportconfig/passport'); // Initiazlie passport configuration

function setup (app) {
  app.use(passport.initialize()); // Initialize passport
  app.use(helmet()); // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

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
  app.use(bodyParser.urlencoded({ extended: true }));

  // app.use(cookieParser());

  // apply CORS
  app.use(cors());
}

module.exports = {
  setup
};
