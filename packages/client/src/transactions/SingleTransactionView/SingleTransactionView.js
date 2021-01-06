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
import { isNotEmpty, isNumber, isValidDate } from '../../utils/regexForValidation';
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
  const [touched, setTouched] = React.useState({
    description: false,
    amount: false,
    transactionDate: false
  });
  const [valid, setValid] = React.useState({
    description: false,
    amount: false,
    transactionDate: false
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
      checkValidationForAll();
    }
  }, [props.editTransaction]);
  const checkValidationForAll = () => {
    for (const [key, value] of Object.entries(object1)) {
      checkValidation(key, value);
    }
  };
  const checkValidation = (name, value) => {
    const copyValid = {
      ...valid
    };

    switch (name) {
      case 'description':
        copyValid[name] = isNotEmpty.test(value);
        break;
      case 'amount':
        copyValid[name] = isNumber.test(value);
        break;
      case 'transactionDate':
        copyValid[name] = isValidDate.test(value);
        console.error(copyValid[name]);
        break;
    }
    setValid(copyValid);
  };
  const myChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setState({
      ...state,
      [name]: value
    });
    checkValidation(name, value);
    setTouched({ ...touched, [name]: true });
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
    setTouched({ description: false, amount: false, transactionDate: false });
    setValid({
      description: false,
      amount: false,
      transactionDate: false
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
  const enableButton = () => {
    return !(
      Object.values(touched).some((obj) => obj === true) &&
      Object.values(valid).every((obj) => obj === true) &&
      !state.isLoading
    );
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
          error={touched.description && !valid.description}
          defaultValue={getFromPropsOrDefaultValue('description')}
        />
        <InputLabel>Amount</InputLabel>
        <FilledInput
          type="number"
          name="amount"
          error={touched.amount && !valid.amount}
          onChange={(event) => myChangeHandler(event)}
          defaultValue={getFromPropsOrDefaultValue('amount')}
        />
        <InputLabel>Date</InputLabel>
        <FilledInput
          type="date"
          name="transactionDate"
          error={touched.transactionDate && !valid.transactionDate}
          onChange={(event) => myChangeHandler(event)}
          defaultValue={
            getFromPropsOrDefaultValue('transactionDate') === ''
              ? ''
              : new Date(getFromPropsOrDefaultValue('transactionDate'))
                  .toISOString()
                  .split('T')[0]
          }
        />
        <Button variant="contained" disabled={enableButton()}>
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
