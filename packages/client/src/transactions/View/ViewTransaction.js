import React from "react";
import PropTypes from 'prop-types';
import "./ViewTransaction.css";
class ViewTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.updatedOrCreatedTransaction !== undefined) {
      const newState = {
        transactions:[...state.transactions]
      };
      newState.transactions[props.updatedOrCreatedTransaction.id]= props.updatedOrCreatedTransaction;
      return newState;
    }
    return state;
  }
  async componentDidMount() {
    const response = await (
      await fetch("http://localhost:8080/getAllTransaction")
    ).json();
    this.setState({ transactions: response });
  }
  onEditTransaction(id){
    this.props.editTransaction(this.state.transactions.find(transaction=> transaction.id === id));
  }
  async onDeleteTransaction(id){
    await fetch("http://localhost:8080/deleteTransaction", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id}),
    });
    // this.state.transactions
    let transactions = [...this.state.transactions];
    const indexOfTransaction = transactions.findIndex((transaction) => transaction.id === id );
    transactions.splice(indexOfTransaction,1);
    this.setState({transactions});
  }
  renderTableData(transactions) {
    const tableList = [];
    tableList.push(
      <tr key="header">
        <th>Description</th>
        <th>Amount</th>
        <th>Transaction Date</th>
      </tr>
    );
    const tableData = transactions.map((transaction) => {
      const { id, description, amount, transactionDate } = transaction; //destructuring
      return (
        <tr key={id}>
          <td>{description}</td>
          <td>{amount}</td>
          <td>
            {transactionDate}
            <span className="AlignRight">
              <input type="button" onClick={()=>this.onEditTransaction(id)} value="Edit"/>
              <input type="button" onClick={()=>this.onDeleteTransaction(id)} value="Delete"/>
            </span>
          </td>
        </tr>
      );
    });
    return tableList.concat(tableData);
  }
  render() {
    return (
      <table className="ViewTransaction">
        <tbody>{this.renderTableData(this.state.transactions)}</tbody>
      </table>
    );
  }
}
ViewTransaction.propTypes = {
  editTransaction: PropTypes.func,
  deleteTransaction: PropTypes.func,
  transactionDate: PropTypes.string,
  updatedOrCreatedTransaction: PropTypes.any
};
export default ViewTransaction;
