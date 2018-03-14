const passport = require('passport');
const mongoose = require('mongoose');
var User = mongoose.model('user');

function getUsers (req, res) {
  let query = User.find({});
  query.exec(function (err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
}

/**
 * Registers new user with nique email
 * @param {obj} req
 * @param {obj} res
 */
function registerUser (req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  // user.setPassword(req.body.password);

  user.save(function (err) {
    if (err) {
      res.status(999)
        .json(err);
      return;
    }

    let token = user.generateJwt();
    res.status(200)
      .json({
        'token': token
      });
  });
}

/**
 * Login function
 * @param {obj} req
 * @param {obj} res
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
      res.status(200)
        .json({
          'token': token
        });
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
