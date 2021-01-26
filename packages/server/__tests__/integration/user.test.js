const supertest = require('supertest');

const app = require('../../src/app');

const request = supertest(app);
jest.mock('../../src/security/auth0', () => require('../mock/jwt'));
jest.mock('../../src/config/constants', () => require('../mock/constant'));
describe('User', () => {
  beforeEach(async () => {
    await request.get('/getAllTransaction').send();
  });
  it('should be able to create Transaction', async () => {
    const addResponse = await request.post('/addTransaction').send({
      description: 'description',
      amount: 123,
      transactionDate: new Date('1111-11-11').toISOString()
    });
    expect(addResponse.status).toBe(200);
  });
  it('should be able to create Transaction and retrieve it', async () => {
    const addResponse = await request.post('/addTransaction').send({
      description: 'description',
      amount: '123',
      transactionDate: new Date('1111-11-11').toISOString()
    });
    expect(addResponse.status).toBe(200);
    const addedTransaction = JSON.parse(addResponse.text).data;
    const getResponse = await request.get('/getAllTransaction').send();
    const transactionList = JSON.parse(getResponse.text).data;
    expect(transactionList.length).toBe(1);
    const transaction = transactionList.find(
      (transaction) => transaction._id === addedTransaction._id
    );
    expect({
      description: transaction.description,
      amount: transaction.amount,
      transactionDate: transaction.transactionDate
    }).toEqual({
      description: 'description',
      amount: 123,
      transactionDate: new Date('1111-11-11').toISOString()
    });
  });
  it('should be able to update transaction', async () => {
    const addResponse = await request.post('/addTransaction').send({
      description: 'description',
      amount: 123,
      transactionDate: new Date('1111-11-11').toISOString()
    });
    expect(addResponse.status).toBe(200);
    const transaction = JSON.parse(addResponse.text).data;
    const editResponse = await request.put('/editTransaction').send({
      id: transaction.id,
      description: 'description2',
      amount: 321
    });
    const data = JSON.parse(editResponse.text).data;
    expect({
      description: data.description,
      amount: data.amount,
      transactionDate: data.transactionDate
    }).toEqual({
      description: 'description2',
      amount: 321,
      transactionDate: new Date('1111-11-11').toISOString()
    });
  });
  it('should be able to delete transaction', async () => {
    const addResponse = await request.post('/addTransaction').send({
      description: 'description',
      amount: 123,
      transactionDate: new Date('1111-11-11').toISOString()
    });
    expect(addResponse.status).toBe(200);
    const transaction = JSON.parse(addResponse.text).data;
    const deleteResponse = await request.delete('/deleteTransaction').send({
      id: transaction.id
    });
    expect(deleteResponse.status).toBe(200);
    const getResponse = await request.get('/getAllTransaction').send();
    const transactionList = JSON.parse(getResponse.text).data;
    expect(transactionList.length).toBe(0);
  });
});
