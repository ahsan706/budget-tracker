import React from 'react';
import SingleTransactionView from './SingleTransactionView/SingleTransactionView';
import ViewTransaction from './View/ViewTransaction';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const styles = (theme) => ({
  addButton: {
    margin: theme.spacing(2)
  }
});

const Transaction = (props) => {
  const [transactionToBeEdited, setTransactionToBeEdited] = React.useState(
    undefined
  );
  const [
    createdOrUpdatedTransaction,
    setCreatedOrUpdatedTransaction
  ] = React.useState(undefined);
  const [openSingleTransactionView, setOpenSingleTransactionView] = React.useState(
    false
  );
  const showAddTransaction = () => {
    setOpenSingleTransactionView(true);
  };
  const editTransaction = (transaction) => {
    setTransactionToBeEdited(transaction);
    setOpenSingleTransactionView(true);
  };
  const dialogClosed = () => {
    setTransactionToBeEdited(undefined);
    setOpenSingleTransactionView(false);
  };
  const updatedOrCreatedTransaction = (transaction) => {
    setCreatedOrUpdatedTransaction(transaction);
  };
  const { classes } = props;
  return (
    <Paper>
      <Button
        className={classes.addButton}
        variant="contained"
        onClick={() => showAddTransaction()}>
        Add Transaction
      </Button>
      <SingleTransactionView
        editTransaction={transactionToBeEdited}
        updatedOrCreatedTransaction={(transaction) =>
          updatedOrCreatedTransaction(transaction)
        }
        dialogClosed={() => dialogClosed()}
        open={openSingleTransactionView}
      />
      <ViewTransaction
        editTransaction={(transaction) => editTransaction(transaction)}
        updatedOrCreatedTransaction={createdOrUpdatedTransaction}
        dialogClosed={() => dialogClosed()}
      />
    </Paper>
  );
};
Transaction.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Transaction);
