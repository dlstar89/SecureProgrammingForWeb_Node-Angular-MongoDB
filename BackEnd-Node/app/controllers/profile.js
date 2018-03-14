var mongoose = require('mongoose');
var User = mongoose.model('user');

/**
 * Returns user profile
 *
 * @param {any} req
 * @param {any} res
 */
function profileRead (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      'message': 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id, ['name', 'email'])
      .exec(function (err, user) {
        if (err) {
          res.send(err);
          return;
        }
        res.status(200).json(user);
      });
  }
}

module.exports = {
  profileRead
};
