import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
  root: {
    width: '60vw',
    padding: theme.spacing(2),
    display: 'flex',
    'flex-direction': 'column'
  },
  marginTop: {
    'margin-top': theme.spacing(4)
  },
  topRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: theme.palette.grey[500]
  },
  inputMaxWidth: {
    width: '50vw'
  }
});
class SingleTransactionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      description: '',
      amount: '',
      transactionDate: '',
      isEditMode: false
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.editTransaction === undefined && state.id === -1) {
      return {
        ...state,
        id: -1,
        description: '',
        amount: '',
        transactionDate: '',
        isEditMode: false
      };
    } else {
      if (
        props.editTransaction !== undefined &&
        props.editTransaction.id !== state.id
      ) {
        return {
          ...state,
          id: props.editTransaction.id,
          description: props.editTransaction.description,
          amount: props.editTransaction.amount,
          transactionDate: props.editTransaction.transactionDate,
          isEditMode: true
        };
      }
    }
    return state;
  }
  myChangeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }
  getStateForServer(state) {
    const allowed = ['description', 'amount', 'transactionDate', 'id'];

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
    let url = 'http://localhost:8080/addTransaction';
    let httpMethod = 'POST';
    if (this.state.isEditMode) {
      url = 'http://localhost:8080/editTransaction';
      httpMethod = 'PUT';
    }
    const response = await fetch(url, {
      method: httpMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.getStateForServer(this.state))
    });
    const transaction = (await response.json()).data;
    this.props.updatedOrCreatedTransaction(transaction);
    this.handleClose();
  }
  handleClose() {
    this.props.dialogClosed();
  }
  getTileText(isEditMode) {
    if (isEditMode) {
      return 'Edit Transaction';
    } else {
      return 'Add Transaction';
    }
  }
  getButtonText(isEditMode) {
    if (isEditMode) {
      return 'Edit';
    } else {
      return 'Add';
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
          className={this.props.classes.root}>
          <InputLabel className={this.props.classes.marginTop}>
            Description
          </InputLabel>
          <FilledInput
            type="text"
            name="description"
            onChange={(event) => this.myChangeHandler(event)}
            className={this.props.classes.inputMaxWidth}
            defaultValue={this.getFromPropsOrDefaultValue('description')}
          />
          <InputLabel className={this.props.classes.marginTop}>Amount</InputLabel>
          <FilledInput
            type="number"
            name="amount"
            onChange={(event) => this.myChangeHandler(event)}
            className={this.props.classes.inputMaxWidth}
            defaultValue={this.getFromPropsOrDefaultValue('amount')}
          />
          <InputLabel className={this.props.classes.marginTop}>Date</InputLabel>
          <FilledInput
            type="date"
            name="transactionDate"
            onChange={(event) => this.myChangeHandler(event)}
            className={this.props.classes.inputMaxWidth}
            defaultValue={this.getFromPropsOrDefaultValue('transactionDate')}
          />
          <Button
            variant="contained"
            className={`${this.props.classes.marginTop} ${this.props.classes.inputMaxWidth}`}>
            {this.getButtonText(this.state.isEditMode)}
          </Button>
        </form>
        <IconButton
          onClick={() => this.handleClose()}
          className={this.props.classes.topRight}>
          <CloseIcon />
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
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SingleTransactionView);
