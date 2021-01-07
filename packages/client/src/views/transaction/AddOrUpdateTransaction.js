import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import FilledInput from '@material-ui/core/FilledInput';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

import axiosInstance from '../../axios/axios';
import { isNotEmpty, isNumber, isValidDate } from '../../utils/regexForValidation';
import { filterKeyFromObject } from '../../utils/utils';
import InformationDialog from '../UIComponents/InformationDialog';
import LoadingDialog from '../UIComponents/LoadingDialog';
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
const initState = {
  id: -1,
  description: '',
  amount: '',
  transactionDate: '',
  isEditMode: false,
  isLoading: false,
  isError: false,
  showInfoDialog: false
};
const initTouchedAndValid = {
  description: false,
  amount: false,
  transactionDate: false
};
const AddOrUpdateTransaction = (props) => {
  const [state, setState] = React.useState(initState);
  const [touched, setTouched] = React.useState(initTouchedAndValid);
  const [valid, setValid] = React.useState(initTouchedAndValid);
  React.useEffect(() => {
    if (
      props.editTransaction !== undefined &&
      props.editTransaction.id !== state.id
    ) {
      setState({
        ...initState,
        id: props.editTransaction.id,
        description: props.editTransaction.description,
        amount: props.editTransaction.amount,
        transactionDate: props.editTransaction.transactionDate,
        isEditMode: true
      });
      setValid({
        description: true,
        amount: true,
        transactionDate: true
      });
    }
  }, [props.editTransaction]);
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
        break;
      default:
        return;
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
    return filterKeyFromObject(originalState, allowed);
  };
  const sendDataToServer = async () => {
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
    return response.data.data;
  };
  const formSubmit = async (event) => {
    setState({
      ...state,
      isLoading: true
    });
    if (event) {
      event.preventDefault();
    }
    const updatedState = {
      ...state
    };
    try {
      const transaction = await sendDataToServer();
      props.updatedOrCreatedTransaction(transaction);
      updatedState.isError = false;
    } catch (err) {
      updatedState.isError = true;
    } finally {
      updatedState.isLoading = false;
      updatedState.showInfoDialog = true;
      setState(updatedState);
    }
  };
  const handleClose = () => {
    setState({
      ...initState
    });
    setTouched({
      ...initTouchedAndValid
    });
    setValid({
      ...initTouchedAndValid
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
  const infoDialogText = () => {
    if (state.isError) {
      return 'Check your internet Connection.';
    } else {
      if (state.isEditMode) {
        return 'Transaction Edited.';
      } else {
        return 'Transaction Added.';
      }
    }
  };
  const handleErrorDialogueClose = () => {
    setState({
      ...state,
      showInfoDialog: false,
      isError: false
    });
    if (state.isError) {
      formSubmit();
    } else {
      handleClose();
    }
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
        <LoadingDialog open={state.isLoading} />
      </form>
      <IconButton onClick={() => handleClose()} className={props.classes.topRight}>
        <CloseIcon />
      </IconButton>
      <InformationDialog
        open={state.showInfoDialog}
        dialogText={infoDialogText()}
        onClose={handleErrorDialogueClose}
      />
    </Dialog>
  );
};
AddOrUpdateTransaction.propTypes = {
  editTransaction: PropTypes.any,
  updatedOrCreatedTransaction: PropTypes.func,
  dialogClosed: PropTypes.func,
  open: PropTypes.bool,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(AddOrUpdateTransaction);
