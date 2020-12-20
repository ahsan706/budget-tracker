import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
const styles = (theme) => ({
  root: {
    width: "60vw",
    padding : theme.spacing(2),
    display: "flex",
    "flex-direction": "column"
  },
  marginTop: {
    "margin-top": theme.spacing(4),
  },
  topRight: {
    position: "absolute",
    right: 0,
    top: 0,
    color: theme.palette.grey[500],
  }
});
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
      if (
        (prevProps.editTransaction === undefined ||
          this.props.editTransaction.id !== prevProps.editTransaction.id) &&
        this.props.editTransaction !== undefined
      )
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
    });
    const transaction = await response.json();
    this.props.updatedOrCreatedTransaction(transaction);
    this.handleClose();
  }
  handleClose() {
    this.props.dialogClosed();
  }
  getTileText(isEditMode) {
    if (isEditMode) {
      return "Edit Transaction";
    } else {
      return "Add Transaction";
    }
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
      <Dialog onClose={() => this.handleClose()} open={this.props.open}>
        <DialogTitle id="simple-dialog-title">
          {this.getTileText(this.state.isEditMode)}
        </DialogTitle>

        <form
          onSubmit={(e) => this.formSubmit(e)}
          method="POST"
          className={this.props.classes.root}
        >
          <InputLabel className={this.props.classes.marginTop}>
            Description
          </InputLabel>
          <FilledInput
            type="text"
            name="description"
            onChange={this.myChangeHandler}
            defaultValue={this.getFromPropsOrDefaultValue("description")}
          />
          <InputLabel className={this.props.classes.marginTop}>
            Amount
          </InputLabel>
          <FilledInput
            type="text"
            name="amount"
            onChange={this.myChangeHandler}
            defaultValue={this.getFromPropsOrDefaultValue("amount")}
          />
          <InputLabel className={this.props.classes.marginTop}>Date</InputLabel>
          <FilledInput
            type="date"
            name="transactionDate"
            onChange={this.myChangeHandler}
            defaultValue={this.getFromPropsOrDefaultValue("transactionDate")}
          />
          <Button variant="contained" className={this.props.classes.marginTop}>
            {this.getButtonText(this.state.isEditMode)}
          </Button>
        </form>
        <IconButton onClick={() => this.handleClose()}className={this.props.classes.topRight}>
        <CloseIcon/>
        </IconButton>
      </Dialog>
    );
  }
}
SingleTransactionView.propTypes = {
  editTransaction: PropTypes.any,
  updatedOrCreatedTransaction: PropTypes.func,
  dialogClosed: PropTypes.func,
  open: PropTypes.bool,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SingleTransactionView);
