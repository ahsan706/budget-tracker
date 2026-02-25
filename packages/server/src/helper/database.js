const mongoose = require('mongoose');
const { dbPath } = require('../config/constants');

const connect = async () => {
  console.log('Connecting to database...', dbPath);
  if (mongoose.connection.readyState === 0) {
    return mongoose.connect(dbPath);
  }
};

const truncate = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({})
    );

    await Promise.all(promises);
  }
};

const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

module.exports = {
  connect,
  truncate,
  disconnect
};
