let config = require('config');
let mongoose = require('mongoose');

// Returns singleton of db
var db = (function () {
  // if (config.util.getEnv('NODE_ENV') === 'test') {
  //   let Mockgoose = require('mockgoose').Mockgoose;
  //   let mockgoose = new Mockgoose(mongoose);
  //   mockgoose.prepareStorage().then(function () {
  //     this.dbData = mongoose.createConnection(config.mongoDB);// App data
  //     this.dbLogs = mongoose.createConnection(config.mongoDBLogs);// App logs
  //     console.log('TEST DBs CONNECTED!');
  //   });
  // } else {
  //   this.dbData = mongoose.createConnection(config.mongoDB);// App data
  //   this.dbLogs = mongoose.createConnection(config.mongoDBLogs);// App logs
  //   console.log('DBs CONNECTED!');
  // }

  this.dbData = mongoose.createConnection(config.mongoDB);// App data
  this.dbLogs = mongoose.createConnection(config.mongoDBLogs);// App logs

  // Drop databases for test environment
  if (config.util.getEnv('NODE_ENV') === 'test') {
    this.dbData.dropDatabase();
    this.dbLogs.dropDatabase();
  }
  console.log('DBs CONNECTED!');

  return this;
})();

module.exports = db;
