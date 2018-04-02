let config = require('config');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let cors = require('cors');
let helmet = require('helmet');
let passport = require('passport');

require('../models/_models'); // Initializes mongoose models
require('../passportconfig/passport'); // Initiazlie passport configuration

function setup (app) {
  app.use(passport.initialize()); // Initialize passport
  app.use(helmet()); // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

  // use morgan to log requests to the console
  if (config.util.getEnv('NODE_ENV') !== 'test') {
    app.use(morgan('dev'));
  }

  // use body parser so we can get data from api body payload
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // use cookie parser
  app.use(cookieParser());

  // apply CORS
  app.use(cors());
}

module.exports = {
  setup
};
