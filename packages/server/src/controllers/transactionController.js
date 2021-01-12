const transactionModel = require('../models/transactionModel');
const transactionController = {
  getAll: function (req, res) {
    transactionModel.find({}, function (err, transaction) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json({
          status: 'success',
          message: 'Got Transaction Successfully!',
          data: transaction
        });
      }
    });
  },
  add: function (req, res) {
    const transaction = new transactionModel();
    transaction.description = req.body.description;
    transaction.amount = req.body.amount;
    transaction.transactionDate = req.body.transactionDate;

    transaction.save(function (err) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json({
          message: 'New Transaction Added!',
          data: transaction
        });
      }
    });
  },
  update: function (req, res) {
    transactionModel.findById(req.body.id, function (err, transaction) {
      if (err) {
        res.status(400).send(err);
      } else {
        if (req.body.description) {
          transaction.description = req.body.description;
        }
        if (req.body.amount) {
          transaction.amount = req.body.amount;
        }
        if (req.body.transactionDate) {
          transaction.transactionDate = req.body.transactionDate;
        }

        transaction.save(function (err) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.json({
              message: 'Transaction Updated Successfully',
              data: transaction
            });
          }
        });
      }
    });
  },
  delete: function (req, res) {
    transactionModel.deleteOne(
      {
        _id: req.body.id
      },
      function (err, contact) {
        if (err) {
          res.status(400).send(err);
        } else {
          res.json({
            status: 'success',
            message: 'Transaction Deleted'
          });
        }
      }
    );
  }
};
module.exports = transactionController;
