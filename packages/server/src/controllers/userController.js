const { userModel } = require('../models/userModel');
const { transactionModel } = require('../models/transactionModel');
const getDemoUser = require('../demo/dataMaker');
const userController = {
  getAll: function (req, res) {
    userModel.findOne({ id: req.user.sub }, function (err, user) {
      if (err) {
        res.status(400).send(err);
      } else {
        if (user === null) {
          const newUser = new userModel(getDemoUser(req.user.sub));
          newUser.save(function () {
            if (err) {
              res.status(400).send(err);
            } else {
              res.json({
                status: 'success',
                message: 'Got Transaction Successfully!',
                data: newUser.transactions.sort(
                  (a, b) => b.transactionDate - a.transactionDate
                )
              });
            }
          });
        } else {
          res.json({
            status: 'success',
            message: 'Got Transaction Successfully!',
            data: user.transactions.sort(
              (a, b) => b.transactionDate - a.transactionDate
            )
          });
        }
      }
    });
  },
  add: function (req, res) {
    const transaction = new transactionModel();
    transaction.description = req.body.description;
    transaction.amount = req.body.amount;
    transaction.transactionDate = req.body.transactionDate;

    userModel.findOne({ id: req.user.sub }, function (err, user) {
      if (err || user === null) {
        res.status(400).send(err);
      } else {
        user.transactions.push(transaction);
        user.save(function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json({
              message: 'New Transaction Added!',
              data: transaction
            });
          }
        });
      }
    });
  },
  delete: function (req, res) {
    userModel.findOne({ id: req.user.sub }, function (err, user) {
      if (err || user === null) {
        res.status(400).send(err);
      } else {
        const transactionIndex = user.transactions.findIndex(
          (transaction) => transaction._id.toString() === req.body.id
        );
        if (transactionIndex === -1) {
          res.status(400).send('Transaction not found.');
        } else {
          user.transactions.splice(transactionIndex, 1);
          user.save(function (err) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.json({
                message: 'Transaction Deleted!'
              });
            }
          });
        }
      }
    });
  },
  update: function (req, res) {
    userModel.findOne({ id: req.user.sub }, function (err, user) {
      if (err || user === null) {
        res.status(400).send(err);
      } else {
        const transaction = user.transactions.find(
          (transaction) => transaction._id.toString() === req.body.id
        );
        if (transaction) {
          if (req.body.description) {
            transaction.description = req.body.description;
          }
          if (req.body.amount) {
            transaction.amount = req.body.amount;
          }
          if (req.body.transactionDate) {
            transaction.transactionDate = req.body.transactionDate;
          }
          user.save(function (err) {
            if (err) {
              res.status(400).send(err);
            } else {
              res.json({
                message: 'New Transaction Deleted!',
                data: transaction
              });
            }
          });
        } else {
          res.status(400).send(err);
        }
      }
    });
  }
};
module.exports = userController;
