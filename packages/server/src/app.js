const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/transactionRoutes');

const databaseHelper = require('./helper/database');
function database() {
  databaseHelper.connect().then(
    () => {
      console.log('connected DB');
    },
    (error) => {
      console.log(error, 'error');
    }
  );
}
function middlewares() {
  app.use(cors());
  app.use(express.json());
}
function routes() {
  app.use('/', apiRoutes);
}
const app = express();
database();
middlewares();
routes();
module.exports = app;
