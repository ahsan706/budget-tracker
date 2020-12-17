const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

// Where we will keep books
let transactions = [
  { id: 0, description: "ss", amount: "2", transactionDate: "2020-12-05" },
  { id: 1, description: "sssw", amount: "www", transactionDate: "2020-12-03" },
];
const getIdForNextTransaction = (transactions) => {
  if(transactions.length === 0){
    return 0;
  }else{
    return transactions.reduce((a, b) => (a.id > b.id ? a : b)).id;
  }
};
app.use(cors());

// Configuring body parser middleware
app.use(express.json());

app.post("/addTransaction", (req, res) => {
  const transaction = req.body;
  transaction.id = getIdForNextTransaction(transactions) + 1;
  transactions.push(transaction);
  res.send(JSON.stringify(transaction));
});
app.put("/editTransaction", (req, res) => {
  const transaction = req.body;
  transactions[transaction.id] = transaction;
  res.send(JSON.stringify(transaction));
});
app.delete("/deleteTransaction", (req, res) => {
  const transaction = req.body;
  const indexOfTransaction = transactions.findIndex((element) => element.id === transaction.id );
  transactions.splice(indexOfTransaction,1);
  res.send(JSON.stringify(transaction));
});
app.get("/getAllTransaction", (req, res) => {
  res.send(JSON.stringify(transactions));
});
app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
