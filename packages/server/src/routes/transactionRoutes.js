const express = require('express');

module.exports = (checkJwt) => {
  const routes = new express.Router();
  routes.get('/', (req, res) => {
    res.json({
      status: 'API Works',
      message: 'Welcome to FirstRest API'
    });
  });
  const userController = require('../controllers/userController');
  routes.get('/getAllTransaction', checkJwt, userController.getAll);
  routes.post('/addTransaction', checkJwt, userController.add);
  routes.delete('/deleteTransaction', checkJwt, userController.delete);
  routes.put('/editTransaction', checkJwt, userController.update);
  return routes;
};
