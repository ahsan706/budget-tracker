const express = require('express');
const cors = require('cors');
const jwt = require('./security/auth0');
const getRoutes = require('./routes/transactionRoutes');

const databaseHelper = require('./helper/database');

require('dotenv').config({ path: './.env' });
const database = () => {
  databaseHelper.connect().then(
    () => {
      console.log('connected DB');
    },
    (error) => {
      console.log(error, 'error');
    }
  );
};
const middleWares = () => {
  app.use(cors());
  app.use(express.json());
};
const routes = (checkJwt) => {
  app.use('/', getRoutes(checkJwt));
};
const app = express();
database();
middleWares();
routes(jwt());
module.exports = app;
