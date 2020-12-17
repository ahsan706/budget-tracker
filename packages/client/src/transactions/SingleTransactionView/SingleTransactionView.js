import React from "react";
import PropTypes from "prop-types";
import "./SingleTransactionView.css";
class SingleTransactionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      description: "",
      amount: "",
      transactionDate: "",
      isEditMode: false,
    };
    this.dialog = React.createRef();
  }
  componentDidUpdate(prevProps) {
    if (this.props.editTransaction === undefined && this.state.id !== -1) {
      this.setState({
        ...this.state,
        id: -1,
        description: "",
        amount: "",
        transactionDate: "",
        isEditMode: false,
      });
    } else {
      if ((prevProps.editTransaction === undefined  || this.props.editTransaction.id !== prevProps.editTransaction.id) && this.props.editTransaction !== undefined)
      this.setState({
        ...this.state,
          id: this.props.editTransaction.id,
          description: this.props.editTransaction.description,
          amount: this.props.editTransaction.amount,
          transactionDate: this.props.editTransaction.transactionDate,
          isEditMode: true,
        });
    }
  }
  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({ [nam]: val });
  };
  getStateForServer(state) {
    const allowed = ["description", "amount", "transactionDate", "id"];

    const filtered = Object.keys(state)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = state[key];
        return obj;
      }, {});
    return filtered;
  }
  async formSubmit(event) {
    event.preventDefault();
    let url = "http://localhost:8080/addTransaction";
    let httpMethod = "POST";
    if (this.state.isEditMode) {
      url = "http://localhost:8080/editTransaction";
      httpMethod = "PUT";
    }
    const response = await fetch(url, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.getStateForServer(this.state)),
    })
      const transaction = await response.json();
      this.props.updatedOrCreatedTransaction(transaction);
      this.hideModal();
  }
  showDialog() {
    this.dialog.current.showModal();
  }
  hideModal() {
    this.props.dialogClosed();
    this.dialog.current.close();
  }
  getButtonText(isEditMode) {
    if (isEditMode) {
      return "Edit";
    } else {
      return "Add";
    }
  }
  getFromPropsOrDefaultValue(key) {
    let val = this.state[key];
    if (this.props.editTransaction) {
      val = this.props.editTransaction[key];
    }
    return val;
  }
  render() {
    return (
      <dialog ref={this.dialog} className="SingleViewTransaction">
        <form onSubmit={(e) => this.formSubmit(e)} method="POST">
          <fieldset>
          <label>Description</label>
          <input
            type="text"
            name="description"
            onChange={this.myChangeHandler}
            defaultValue={this.getFromPropsOrDefaultValue("description")}
          />
          <label>Amount</label>
          <input
            type="text"
            name="amount"
            onChange={this.myChangeHandler}
            defaultValue={this.getFromPropsOrDefaultValue("amount")}
          />
          <label>Date</label>
          <input
            type="date"
            name="transactionDate"
            onChange={this.myChangeHandler}
            defaultValue={this.getFromPropsOrDefaultValue("transactionDate")}
          />
          <input
            type="submit"
            value={this.getButtonText(this.state.isEditMode)}
            className="bigMarginV"
          />
          </fieldset>
        </form>
        <span
          onClick={() => this.hideModal()}
          className="close topRight"
        >
        </span>
      </dialog>
    );
  }
}
SingleTransactionView.propTypes = {
  editTransaction: PropTypes.any,
  updatedOrCreatedTransaction: PropTypes.func,
  dialogClosed: PropTypes.func

};
export default SingleTransactionView;
