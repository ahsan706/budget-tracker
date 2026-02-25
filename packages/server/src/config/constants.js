let dbPath = 'mongodb://localhost/budget-tracker';
if (process.env.NODE_ENV === 'test') {
  dbPath = global.__DB_URL__;
}
console.log(
  process.env.DB_URL,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,
  process.env.DB_USERNAME
);
if (
  process.env.DB_URL &&
  process.env.DB_PASSWORD &&
  process.env.DB_NAME &&
  process.env.DB_USERNAME
) {
  dbPath = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}?appName=${process.env.DB_NAME}`;
}
const port = process.env.PORT || 8080;
const demoTransactionCount = 10;
const randomTextForDescription = [
  'Oil Change',
  'Car Insurance and Registration',
  'Inspections',
  'Gardening Supplies',
  'Pest Control',
  'Child Care Fees and Extracurricular Activities',
  'Organization Dues',
  'Haircuts',
  'Pet Care',
  'Babysitter',
  'Annual Checkups',
  'Medicine and Vitamins',
  'Gifts',
  'Seasonal Clothing',
  'Taxes',
  'Subscriptions and Memberships'
];
const baseRandomAmount = 0;
const maxRandomAmount = 10;
const rangeOfDays = 13;
module.exports = {
  dbPath,
  port,
  demoTransactionCount,
  randomTextForDescription,
  baseRandomAmount,
  maxRandomAmount,
  rangeOfDays
};
