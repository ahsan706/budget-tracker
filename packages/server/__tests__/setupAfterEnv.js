require('dotenv').config();

const databaseHelper = require('../src/helper/database');

beforeAll(() => {
  return databaseHelper.connect();
});

beforeEach(() => {
  return databaseHelper.truncate();
});

afterAll(() => {
  return databaseHelper.disconnect();
});
