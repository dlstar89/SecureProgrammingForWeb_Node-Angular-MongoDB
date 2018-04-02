let Schema = require('mongoose').Schema;
let db = require('../db/db');

let authorisationSchema = new Schema({
  authName: {
    type: String,
    unique: true,
    required: true
  },
  authLevel: {
    type: Number,
    unique: true,
    required: true
  }
}, { versionKey: false });

authorisationSchema.methods.setAnsweredStatus = function (isAnswered) {
  this.markedAsAnswer = isAnswered;
};

module.exports = db.dbData.model('authorisation', authorisationSchema);
