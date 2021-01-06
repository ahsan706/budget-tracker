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
import CircularProgress from '@material-ui/core/CircularProgress';
import axiosInstance from '../../axios/axios';
const styles = (theme) => ({
  form: {
    padding: theme.spacing(2),
    display: 'flex',
    gap: theme.spacing(2),
    'flex-direction': 'column'
  },
  topRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    color: theme.palette.grey[500]
  }
});
const SingleTransactionView = (props) => {
  const [state, setState] = React.useState({
    id: -1,
    description: '',
    amount: '',
    transactionDate: '',
    isEditMode: false,
    isLoading: false
  });
  React.useEffect(() => {
    if (
      props.editTransaction !== undefined &&
      props.editTransaction.id !== state.id
    ) {
      setState({
        id: props.editTransaction.id,
        description: props.editTransaction.description,
        amount: props.editTransaction.amount,
        transactionDate: props.editTransaction.transactionDate,
        isEditMode: true
      });
    }
  }, [props.editTransaction]);
  const myChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({
      ...state,
      [name]: value
    });
  };
  const getStateForServer = (originalState) => {
    const allowed = ['description', 'amount', 'transactionDate', 'id'];

    const filtered = Object.keys(state)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = originalState[key];
        return obj;
      }, {});
    return filtered;
  };
  const formSubmit = async (event) => {
    setState({
      ...state,
      isLoading: true
    });
    event.preventDefault();
    let response = {};
    if (state.isEditMode) {
      response = await axiosInstance.put(
        'editTransaction',
        getStateForServer(state)
      );
    } else {
      response = await axiosInstance.post(
        'addTransaction',
        getStateForServer(state)
      );
    }
    const transaction = response.data.data;
    setState({
      ...state,
      isLoading: false
    });
    props.updatedOrCreatedTransaction(transaction);
    handleClose();
  };
  const handleClose = () => {
    setState({
      id: -1,
      description: '',
      amount: '',
      transactionDate: '',
      isEditMode: false,
      isLoading: false
    });
    props.dialogClosed();
  };
  const getTileText = (isEditMode) => {
    if (isEditMode) {
      return 'Edit Transaction';
    } else {
      return 'Add Transaction';
    }
  };
  const getButtonText = (isEditMode) => {
    if (isEditMode) {
      return 'Edit';
    } else {
      return 'Add';
    }
  };
  const getFromPropsOrDefaultValue = (key) => {
    let val = state[key];
    if (props.editTransaction) {
      val = props.editTransaction[key];
    }
    return val;
  };
  return (
    <Dialog
      onClose={() => handleClose()}
      open={props.open}
      fullWidth={true}
      maxWidth={false}>
      <DialogTitle id="simple-dialog-title">
        {getTileText(state.isEditMode)}
      </DialogTitle>

      <form
        onSubmit={(e) => formSubmit(e)}
        method="POST"
        className={props.classes.form}>
        <InputLabel>Description</InputLabel>
        <FilledInput
          type="text"
          name="description"
          onChange={(event) => myChangeHandler(event)}
          fullWidth={true}
          defaultValue={getFromPropsOrDefaultValue('description')}
        />
        <InputLabel>Amount</InputLabel>
        <FilledInput
          type="number"
          name="amount"
          onChange={(event) => myChangeHandler(event)}
          defaultValue={getFromPropsOrDefaultValue('amount')}
        />
        <InputLabel>Date</InputLabel>
        <FilledInput
          type="date"
          name="transactionDate"
          onChange={(event) => myChangeHandler(event)}
          defaultValue={
            getFromPropsOrDefaultValue('transactionDate') === ''
              ? ''
              : new Date(getFromPropsOrDefaultValue('transactionDate'))
                  .toISOString()
                  .split('T')[0]
          }
        />
        <Button variant="contained" disabled={state.isLoading}>
          {getButtonText(state.isEditMode)}
        </Button>
        <Dialog open={state.isLoading} PaperComponent="div">
          <CircularProgress color="secondary" />
        </Dialog>
      </form>
      <IconButton onClick={() => handleClose()} className={props.classes.topRight}>
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
};
SingleTransactionView.propTypes = {
  editTransaction: PropTypes.any,
  updatedOrCreatedTransaction: PropTypes.func,
  dialogClosed: PropTypes.func,
  open: PropTypes.bool,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SingleTransactionView);
