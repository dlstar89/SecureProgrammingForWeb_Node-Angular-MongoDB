let db = require('../db/db');
var Log = db.dbLogs.model('log');

// module.exports = function (options) {
//   return function (req, res, next) {
//     console.log(req);

//     next();
//   };
// };

var loger = (function () {
  this.createLog = function (logData) {
    var log = {
      action: logData.action,
      userId: logData.userId,
      code: logData.code,
      ip: logData.ip,
      extra: logData.extra
    };

    Log
      .create([log])
      .catch(err => {
        if (err) {
          console.error(err);
        }
      });
  };

  return this;
})();

module.exports = loger;
