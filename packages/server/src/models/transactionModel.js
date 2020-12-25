const mongoose = require('mongoose');
// id: 0, description: 'ss', amount: '2', transactionDate: '2020-12-05'
const transactionSchema = mongoose.Schema({
  description: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  amount: {
    type: mongoose.Schema.Types.Number,
    required: true
  },
  transactionDate: {
    type: mongoose.Schema.Types.Date,
    required: true
  }
});
transactionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
transactionSchema.set('toJSON', {
  virtuals: true
});
module.exports = mongoose.model('transaction', transactionSchema);
