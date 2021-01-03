const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8080;
const apiRoutes = require('./routes/transactionRoutes');

app.use(cors());

// Configuring body parser middleware
app.use(express.json());
let dbPath = 'mongodb://localhost/budget-tracker';
if (process.env.DB_URL && process.env.DB_PASSWORD && process.env.DB_NAME) {
  dbPath = `mongodb+srv://${process.env.DB_URL}:${process.env.DB_PASSWORD}@cluster0.idfhi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
}
const options = { useNewUrlParser: true, useUnifiedTopology: true };
const mongo = mongoose.connect(dbPath, options);
mongo.then(
  () => {
    console.log('connected DB');
  },
  (error) => {
    console.log(error, 'error');
  }
);
app.use('/', apiRoutes);
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
