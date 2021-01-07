import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TableContainer from '@material-ui/core/TableContainer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import axiosInstance from '../../axios/axios';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);
const styles = (theme) => ({
  root: {
    width: '100%',
    height: '74vh',
    overflow: 'auto',
    padding: `0 ${theme.spacing(1)} 0 ${theme.spacing(1)}`
  }
});
const ViewTransaction = (props) => {
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
  const getDataFromServer = async () => {
    setDialogState({ ...dialogState, isLoading: true });
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
  React.useEffect(async () => getDataFromServer(), []);
  const onEditTransaction = (id) => {
    props.editTransaction(transactions.find((transaction) => transaction.id === id));
  };
  const onDeleteTransaction = async (id) => {
    setDialogState({ ...dialogState, isLoading: true });
    const newDialogState = { ...dialogState };
    try {
      await axiosInstance.delete('deleteTransaction', { id });
      const transactionsCopy = [...transactions];
      const indexOfTransaction = transactionsCopy.findIndex(
        (transaction) => transaction.id === id
      );
      transactionsCopy.splice(indexOfTransaction, 1);
      setTransactions(transactionsCopy);
    } catch (err) {
      newDialogState.isError = true;
      newDialogState.showInfoDialog = true;
      newDialogState.onDialogClosed = () => onDeleteTransaction(id);
    } finally {
      newDialogState.isLoading = false;
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
              <Grid item xs={9}>
                <Typography>
                  {new Date(transactionDate).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={5}>
                    <IconButton onClick={() => onEditTransaction(id)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={5}>
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
      return 'Check your internet Connection.';
    } else {
      return 'Transaction Deleted.';
    }
  };
  const InformationDialogue = () => {
    const handleErrorDialogueClose = async () => {
      const onDialogClosed = dialogState.onDialogClosed;
      setDialogState({
        ...dialogState,
        showInfoDialog: false,
        isError: false,
        onDialogClosed: undefined
      });
      await onDialogClosed();
    };
    return (
      <Dialog open={dialogState.showInfoDialog}>
        <DialogContent>
          <DialogContentText>{infoDialogText()}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleErrorDialogueClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <Fragment>
      <TableContainer className={props.classes.root} aria-label="customized table">
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow key="header">
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Transaction Date</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>{renderTableData(transactions)}</TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogState.isLoading} PaperComponent="div">
        <CircularProgress color="secondary" />
      </Dialog>
      <InformationDialogue />
    </Fragment>
  );
};
ViewTransaction.propTypes = {
  editTransaction: PropTypes.func,
  updatedOrCreatedTransaction: PropTypes.any,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ViewTransaction);
