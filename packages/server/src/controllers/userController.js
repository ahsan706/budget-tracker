const { userModel } = require('../models/userModel');
const { transactionModel } = require('../models/transactionModel');
const getDemoUser = require('../demo/dataMaker');
const userController = {
  getAll: async function (req, res) {
    try {
      const user = await userModel.findOne({ id: req.auth.sub });
      if (user === null) {
        const newUser = new userModel(getDemoUser(req.auth.sub));
        await newUser.save();
        return res.json({
          status: 'success',
          message: 'Got Transaction Successfully!',
          data: newUser.transactions.sort(
            (a, b) => b.transactionDate - a.transactionDate
          )
        });
      }
      res.json({
        status: 'success',
        message: 'Got Transaction Successfully!',
        data: user.transactions.sort(
          (a, b) => b.transactionDate - a.transactionDate
        )
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  add: async function (req, res) {
    const transaction = new transactionModel();
    transaction.description = req.body.description;
    transaction.amount = req.body.amount;
    transaction.transactionDate = req.body.transactionDate;
    try {
      const user = await userModel.findOne({ id: req.auth.sub });
      if (user === null) {
        return res.status(400).send('User not found.');
      }
      user.transactions.push(transaction);
      await user.save();
      res.json({
        message: 'New Transaction Added!',
        data: transaction
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  delete: async function (req, res) {
    try {
      const user = await userModel.findOne({ id: req.auth.sub });
      if (user === null) {
        return res.status(400).send('User not found.');
      }
      const transactionIndex = user.transactions.findIndex(
        (transaction) => transaction._id.toString() === req.body.id
      );
      if (transactionIndex === -1) {
        return res.status(400).send('Transaction not found.');
      }
      user.transactions.splice(transactionIndex, 1);
      await user.save();
      res.json({ message: 'Transaction Deleted!' });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  update: async function (req, res) {
    try {
      const user = await userModel.findOne({ id: req.auth.sub });
      if (user === null) {
        return res.status(400).send('User not found.');
      }
      const transaction = user.transactions.find(
        (transaction) => transaction._id.toString() === req.body.id
      );
      if (!transaction) {
        return res.status(400).send('Transaction not found.');
      }
      if (req.body.description) transaction.description = req.body.description;
      if (req.body.amount) transaction.amount = req.body.amount;
      if (req.body.transactionDate)
        transaction.transactionDate = req.body.transactionDate;
      await user.save();
      res.json({
        message: 'Transaction Updated!',
        data: transaction
      });
    } catch (err) {
      res.status(400).send(err);
    }
  }
};
module.exports = userController;
