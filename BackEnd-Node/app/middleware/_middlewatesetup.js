let config = require('config');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');
let helmet = require('helmet');
let passport = require('passport');
let mongoSanitize = require('express-mongo-sanitize');


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

  // MongoDB sanitizer
  app.use(mongoSanitize());

  // apply CORS for live environment
  if (config.util.getEnv('NODE_ENV') === 'production') {
    var whitelist = ['undefined', 'http://localhost:4200'];
    var corsOptions = {
      origin: function (origin, callback) {
        console.log('ORIGIN: ' + origin);
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
    };
    app.use(cors(corsOptions));
  } else {
    // CORS for DEV & TEST environment
    app.use(cors());
  }
}

module.exports = {
  setup
};
