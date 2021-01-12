const express = require('express');
const routes = new express.Router();
routes.get('/', function (req, res) {
  res.json({
    status: 'API Works',
    message: 'Welcome to FirstRest API'
  });
});
const transactionController = require('../controllers/transactionController');

routes.get('/getAllTransaction', transactionController.getAll);
routes.post('/addTransaction', transactionController.add);
routes.delete('/deleteTransaction', transactionController.delete);
routes.put('/editTransaction', transactionController.update);

module.exports = routes;
