const transactionModel = require('../models/transactionModel');
const transactionController = {
  getAll: function (req, res) {
    transactionModel.find({}, function (err, transaction) {
      if (err)
        res.json({
          status: 'error',
          message: err
        });
      res.json({
        status: 'success',
        message: 'Got Transaction Successfully!',
        data: transaction
      });
    });
  },
  add: function (req, res) {
    const transaction = new transactionModel();
    transaction.description = req.body.description;
    transaction.amount = req.body.amount;
    transaction.transactionDate = req.body.transactionDate;

    transaction.save(function (err) {
      if (err) res.json(err);

      res.json({
        message: 'New Transaction Added!',
        data: transaction
      });
    });
  },
  update: function (req, res) {
    transactionModel.findById(req.body.id, function (err, transaction) {
      if (err) res.send(err);
      transaction.description = req.body.description;
      transaction.amount = req.body.amount;
      transaction.transactionDate = req.body.transactionDate;

      transaction.save(function (err) {
        if (err) res.json(err);
        res.json({
          message: 'Transaction Updated Successfully',
          data: transaction
        });
      });
    });
  },
  delete: function (req, res) {
    transactionModel.deleteOne(
      {
        _id: req.body.id
      },
      function (err, contact) {
        if (err) res.send(err);
        res.json({
          status: 'success',
          message: 'Transaction Deleted'
        });
      }
    );
  }
};
module.exports = transactionController;
