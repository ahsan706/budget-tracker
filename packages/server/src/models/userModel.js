const mongoose = require('mongoose');
const { transactionSchema } = require('./transactionModel');
// id: 0, description: 'ss', amount: '2', transactionDate: '2020-12-05'
const userSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  transactions: [transactionSchema],
  isDemo: {
    type: mongoose.Schema.Types.Boolean
  },
  child: transactionSchema
});

module.exports = { userModel: mongoose.model('user', userSchema), userSchema };
