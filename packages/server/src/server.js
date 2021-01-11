const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { dbPath, port } = require('./config/constants');
const app = express();

const apiRoutes = require('./routes/transactionRoutes');

app.use(cors());

// Configuring body parser middleware
app.use(express.json());

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
