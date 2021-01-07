import React from 'react';
import AddOrUpdateTransaction from './transaction/AddOrUpdateTransaction';
import TransactionsList from './transaction/transactionList/TransactionsList';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const styles = (theme) => ({
  addButton: {
    margin: theme.spacing(2)
  }
});

const MainView = (props) => {
  const [transactionToBeEdited, setTransactionToBeEdited] = React.useState(
    undefined
  );
  const [
    createdOrUpdatedTransaction,
    setCreatedOrUpdatedTransaction
  ] = React.useState(undefined);
  const [
    openAddOrUpdateTransactionView,
    setOpenAddOrUpdateTransactionView
  ] = React.useState(false);
  const showAddTransaction = () => {
    setOpenAddOrUpdateTransactionView(true);
  };
  const editTransaction = (transaction) => {
    setTransactionToBeEdited(transaction);
    setOpenAddOrUpdateTransactionView(true);
  };
  const dialogClosed = () => {
    setTransactionToBeEdited(undefined);
    setOpenAddOrUpdateTransactionView(false);
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
      <AddOrUpdateTransaction
        editTransaction={transactionToBeEdited}
        updatedOrCreatedTransaction={(transaction) =>
          updatedOrCreatedTransaction(transaction)
        }
        dialogClosed={() => dialogClosed()}
        open={openAddOrUpdateTransactionView}
      />
      <TransactionsList
        editTransaction={(transaction) => editTransaction(transaction)}
        updatedOrCreatedTransaction={createdOrUpdatedTransaction}
        dialogClosed={() => dialogClosed()}
      />
    </Paper>
  );
};
MainView.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MainView);
