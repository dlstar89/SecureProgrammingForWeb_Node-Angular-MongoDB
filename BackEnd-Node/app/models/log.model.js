let Schema = require('mongoose').Schema;
let db = require('../db/db');

// class LogClass {
//   constructor(logText) {
//     if (this.constructor !== LogClass) {
//       throw new Error('Subclassing is not allowed');
//     }

//     this.logText = logText;
//   }

//   getLog () {
//     return this.logText;
//   }
// }

var logSchema = new Schema({
  action: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: false
  },
  ip: {
    type: String,
    required: false
  },
  extra: {
    type: Object,
    required: false
  },
  time: {
    type: Date,
    default: Date.now()
  }
}, { versionKey: false });

// logSchema.loadClass(LogClass);

module.exports = db.dbLogs.model('log', logSchema);
