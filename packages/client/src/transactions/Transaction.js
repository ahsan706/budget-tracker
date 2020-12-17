import React from "react";
import SingleTransactionView from "./SingleTransactionView/SingleTransactionView";
import ViewTransaction from "./View/ViewTransaction";
import "./Transaction.css";
class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editTransaction: undefined,
      createdOrUpdatedTransaction: undefined
    };
    this.singleTransactionView = React.createRef();
  }
  showAddTransaction() {
    this.singleTransactionView.current.showDialog();
  }
  editTransaction(editTransaction){
    this.setState({ editTransaction: editTransaction });
    this.singleTransactionView.current.showDialog()
  }
  dialogClosed(){
    this.setState({ editTransaction: undefined });
  }
  updatedOrCreatedTransaction(transaction){
    this.setState({ createdOrUpdatedTransaction: transaction });
  }
  render() {
    return (
      <div className="Transaction">
        <button onClick={() => this.showAddTransaction()}>
          Add Transaction
        </button>
        <SingleTransactionView ref={this.singleTransactionView} editTransaction={this.state.editTransaction}  updatedOrCreatedTransaction={this.updatedOrCreatedTransaction.bind(this)} dialogClosed={this.dialogClosed.bind(this)}/>
        <ViewTransaction editTransaction={this.editTransaction.bind(this)} updatedOrCreatedTransaction={this.state.createdOrUpdatedTransaction} dialogClosed={this.dialogClosed.bind(this)}/>
      </div>
    );
  }
}

export default Transaction;
