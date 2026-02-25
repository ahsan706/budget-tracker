import React from 'react';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import AddOrUpdateTransaction from './transaction/AddOrUpdateTransaction';
import TransactionsList from './transaction/transactionList/TransactionsList';
import useTranslation from '../../../utils/translation';

export default function MainView() {
  const { t } = useTranslation();
  const [transactionToBeEdited, setTransactionToBeEdited] =
    React.useState(undefined);
  const [createdOrUpdatedTransaction, setCreatedOrUpdatedTransaction] =
    React.useState(undefined);
  const [openAddOrUpdateTransactionView, setOpenAddOrUpdateTransactionView] =
    React.useState(false);
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
        sx={{ margin: 2 }}
        variant="contained"
        onClick={() => showAddTransaction()}
      >
        {t('App.MainView.add-transaction')}
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
