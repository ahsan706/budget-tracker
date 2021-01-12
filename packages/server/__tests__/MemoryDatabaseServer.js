const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer({
  binary: {
    version: '4.2.0'
  },
  autoStart: false
});
const MemoryDatabaseServer = {
  start: function () {
    return mongod.start();
  },
  stop: function () {
    return mongod.stop();
  },
  getUri: function () {
    return mongod.getUri();
  }
};

module.exports = MemoryDatabaseServer;
