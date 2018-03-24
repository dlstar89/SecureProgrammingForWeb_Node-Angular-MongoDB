let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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

module.exports = mongoose.model('authorisation', authorisationSchema);
