import React, { Fragment } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import StyledTableCell from './table/StyledTableCell';
import StyledTableRow from './table/StyledTableRow';
import axiosInstance from '../../../../../axios/axios';
import useTranslation from '../../../../../utils/translation';
import InformationDialog from '../../../../UIComponents/InformationDialog';
import LoadingDialog from '../../../../UIComponents/LoadingDialog';

const TransactionsList = (props) => {
  const { getAccessTokenSilently } = useAuth0();
  const { t } = useTranslation();
  const [transactions, setTransactions] = React.useState([]);
  const [dialogState, setDialogState] = React.useState({
    isError: false,
    showInfoDialog: false,
    isLoading: false,
    onDialogClosed: undefined
  });
  React.useEffect(() => {
    if (props.updatedOrCreatedTransaction !== undefined) {
      const transactionsCopy = [...transactions];

      const index = transactionsCopy.findIndex(
        (transaction) => transaction.id === props.updatedOrCreatedTransaction.id
      );
      if (index === -1) {
        transactionsCopy.push(props.updatedOrCreatedTransaction);
      } else {
        transactionsCopy[index] = props.updatedOrCreatedTransaction;
      }
      setTransactions(transactionsCopy);
    }
  }, [props.updatedOrCreatedTransaction]);
  const getUserToken = async () => {
    try {
      return await getAccessTokenSilently({
        audience: import.meta.env.VITE_Auth0_Audience,
        scope: 'read:current_user'
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  const getDataFromServer = async () => {
    setDialogState({ ...dialogState, isLoading: true });
    const accessToken = await getUserToken();
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const newDialogState = { ...dialogState };
    try {
      const response = await axiosInstance.get('getAllTransaction');
      setTransactions(response.data.data);
    } catch (err) {
      newDialogState.isError = true;
      newDialogState.showInfoDialog = true;
      newDialogState.onDialogClosed = getDataFromServer;
    } finally {
      newDialogState.isLoading = false;
      setDialogState(newDialogState);
    }
  };
  React.useEffect(() => {
    getDataFromServer();
  }, []);
  const onEditTransaction = (id) => {
    props.editTransaction(transactions.find((transaction) => transaction.id === id));
  };
  const onDeleteTransaction = async (id) => {
    setDialogState({ ...dialogState, isLoading: true });
    const newDialogState = { ...dialogState };
    try {
      await axiosInstance.delete('deleteTransaction', { data: { id } });
      const transactionsCopy = [...transactions];
      const indexOfTransaction = transactionsCopy.findIndex(
        (transaction) => transaction.id === id
      );
      transactionsCopy.splice(indexOfTransaction, 1);
      setTransactions(transactionsCopy);
    } catch (err) {
      newDialogState.isError = true;
      newDialogState.onDialogClosed = () => onDeleteTransaction(id);
    } finally {
      newDialogState.isLoading = false;
      newDialogState.showInfoDialog = true;
      setDialogState(newDialogState);
    }
  };
  const renderTableData = (transactionsToRender) => {
    const tableList = [];
    tableList.push();
    const tableData = transactionsToRender.map((transaction) => {
      const { id, description, amount, transactionDate } = transaction;
      return (
        <StyledTableRow key={id}>
          <StyledTableCell>{description}</StyledTableCell>
          <StyledTableCell>{amount}</StyledTableCell>
          <StyledTableCell>
            <Grid container>
              <Grid size={9}>
                <Typography>
                  {new Date(transactionDate).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid size={3}>
                <Grid container>
                  <Grid size={5}>
                    <IconButton onClick={() => onEditTransaction(id)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                  <Grid size={5}>
                    <IconButton onClick={() => onDeleteTransaction(id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </StyledTableCell>
        </StyledTableRow>
      );
    });
    return tableList.concat(tableData);
  };
  const infoDialogText = () => {
    if (dialogState.isError) {
      return t('Common.error-message');
    } else {
      return t('Common.transaction-deleted');
    }
  };
  const handleErrorDialogueClose = async () => {
    const onDialogClosed = dialogState.onDialogClosed;
    setDialogState({
      ...dialogState,
      showInfoDialog: false,
      isError: false,
      onDialogClosed: undefined
    });
    // It will be available only in case of failed call retry.
    if (onDialogClosed) {
      await onDialogClosed();
    }
  };
  return (
    <Fragment>
      <TableContainer
        sx={{ width: '100%', height: '74vh', overflow: 'auto', px: 1 }}
        aria-label="customized table"
      >
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow key="header">
              <StyledTableCell>{t('Common.description')}</StyledTableCell>
              <StyledTableCell>{t('Common.amount')}</StyledTableCell>
              <StyledTableCell>{t('Common.transaction-date')}</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>{renderTableData(transactions)}</TableBody>
        </Table>
      </TableContainer>
      <LoadingDialog open={dialogState.isLoading} />
      <InformationDialog
        open={dialogState.showInfoDialog}
        dialogText={infoDialogText()}
        onClose={handleErrorDialogueClose}
      />
    </Fragment>
  );
};
TransactionsList.propTypes = {
  editTransaction: PropTypes.func,
  updatedOrCreatedTransaction: PropTypes.any
};
export default TransactionsList;
