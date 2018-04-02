let db = require('../db/db');
let User = db.dbData.model('user');
let logger = require('../logger/loger');

/**
 * Returns user profile
 *
 * @param {any} req
 * @param {any} res
 */
function profileRead (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    logger.createLog({ action: 'Unauthorized reading profile', code: 401, ip: req.ip });

    res
      .status(401)
      .json({
        'message': 'UnauthorizedError: private profile'
      });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id, ['name', 'email'])
      .exec()
      .then(user => {
        logger.createLog({ action: 'User requested profile', code: 200, userId: req.payload._id, ip: req.ip });

        res
          .status(200)
          .json(user);
      })
      .catch(err => {
        res.send(err);
      });
  }
}

module.exports = {
  profileRead
};
