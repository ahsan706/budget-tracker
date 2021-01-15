import React from 'react';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import useTranslation from '../../../utils/translation';
import AddOrUpdateTransaction from './transaction/AddOrUpdateTransaction';
import TransactionsList from './transaction/transactionList/TransactionsList';

const useStyles = makeStyles((theme) => ({
  addButton: {
    margin: theme.spacing(2)
  }
}));

export default function MainView() {
  const classes = useStyles();
  const { t, ready } = useTranslation();
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
  return (
    <Paper>
      <Button
        className={classes.addButton}
        variant="contained"
        onClick={() => showAddTransaction()}>
        {ready ? t('App.MainView.add-transaction') : null}
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
}
