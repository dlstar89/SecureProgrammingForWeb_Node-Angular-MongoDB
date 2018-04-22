let db = require('../db/db');
let User = db.dbData.model('user');
let Autherisation = db.dbData.model('authorisation');

/**
 * Checks if user is an administrator
 *
 * @param {string} _userid
 * @returns bool
 */
function isAdmin (_userid) {
  return Promise.all([
    Autherisation
      .findOne({ authName: 'Admin' })
      .exec()
      .then(res => {
        var authid = res._id;
        return Promise.all([
          User
            .findById(_userid)
            .exec()
            .then(user => {
              if (user.authorisation.indexOf(authid) !== -1) {
                return true;
              } else {
                return false;
              }
            })
            .catch(err => {
              if (err) {
                console.error(err);
                return false;
              }
            })
        ]);
      })
      .catch(err => {
        if (err) {
          console.error(err);
          return false;
        }
      })
  ]);
}

module.exports = {
  isAdmin
};
