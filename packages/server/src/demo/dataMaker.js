const {
  demoTransactionCount,
  randomTextForDescription,
  baseRandomAmount,
  maxRandomAmount,
  rangeOfDays
} = require('../config/constants');
const {
  randomDate,
  randomItemFromList,
  randomNumber
} = require('../utils/util');
const getDemoUser = function (id) {
  return { id, isDemo: true, transactions: getDemoTransactions() };
};
const getDemoTransactions = function () {
  const transactions = [];
  const dateToday = new Date();
  const dateEarlier = new Date();
  dateEarlier.setDate(dateEarlier.getDate() - rangeOfDays);
  for (let i = 0; i < demoTransactionCount; i++) {
    transactions.push({
      description: randomItemFromList(randomTextForDescription),
      amount: randomNumber(baseRandomAmount, maxRandomAmount),

      transactionDate: randomDate(dateEarlier, dateToday)
    });
  }
  return transactions;
};
module.exports = getDemoUser;
