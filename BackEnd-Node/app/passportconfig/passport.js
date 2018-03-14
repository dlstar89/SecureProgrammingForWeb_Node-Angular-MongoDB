let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let User = mongoose.model('user');

/**
 * Implements LocalStrategy way of authenticating user
 * @param {string} email
 */
passport.use(new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email'
  // passwordField: 'password',
  // passReqToCallback: true // allows us to pass back the entire request to the callback
},
function (username, password, done) {
  User.findOne({
    email: username
  }, function (err, user) {
    if (err) {
      return done(err);
    }
    // Return if user not found in database
    if (!user) {
      return done(null, false, {
        message: 'User not found'
      });
    }
    // Return if password is wrong
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Password is wrong'
      });
    }
    // If credentials are correct, return the user object
    return done(null, user);
  });
}
));
