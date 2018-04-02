const passport = require('passport');
let db = require('../db/db');
let User = db.dbData.model('user');
let logger = require('../logger/loger');

// const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

/**
 * Returns all users
 *
 * @param {any} req
 * @param {any} res
 */
function getUsers (req, res) {
  User
    .find({})
    .populate('authorisation')
    .exec(function (err, users) {
      if (err) {
        res.send(err);
      }
      res.status(200).json(users);
    });
}

/**
 * Registers new user with nique email
 *
 * @param {obj} req
 * @param {obj} res
 */
function registerUser (req, res) {
  let password = req.body.password;
  if (strongPasswordRegex.test(password) === false) {
    res.status(321).json({ error: 'Invalid data provided' });
    return;
  }

  let email = req.body.email;
  if (emailRegex.test(email) === false) {
    res.status(321).json({ error: 'Invalid data provided' });
    return;
  }

  var user = new User({
    name: req.body.name,
    email: email,
    password: password
  });

  // user.setPassword(req.body.password);

  user.save(function (err) {
    if (err) {
      res.status(999).json(err);
      return;
    }

    // Log user authenticated
    logger.createLog({ action: 'Register', code: 200, userId: user._id, ip: req.ip });

    let token = user.generateJwt();
    res.status(200).json({ 'token': token });
  });
}

/**
 * Logins user
 *
 * @param {any} req
 * @param {any} res
 */
function loginUser (req, res) {
  passport.authenticate('local', function (err, user, info) {
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      let token = user.generateJwt();
      // Log user authenticated
      logger.createLog({ action: 'Login', code: 200, userId: user._id, ip: req.ip });
      res.status(200).json({ 'token': token });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
}

module.exports = {
  getUsers,
  registerUser,
  loginUser
};
