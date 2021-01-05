import React from 'react';
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
  React.useEffect(async () => {
    const response = await axiosInstance.get('getAllTransaction');
    setTransactions(response.data.data);
  }, []);
  const onEditTransaction = (id) => {
    props.editTransaction(transactions.find((transaction) => transaction.id === id));
  };
  const onDeleteTransaction = async (id) => {
    await axiosInstance.delete('deleteTransaction', { id });
    const transactionsCopy = [...transactions];
    const indexOfTransaction = transactionsCopy.findIndex(
      (transaction) => transaction.id === id
    );
    transactionsCopy.splice(indexOfTransaction, 1);
    setTransactions(transactionsCopy);
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
  return (
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
  );
};
ViewTransaction.propTypes = {
  editTransaction: PropTypes.func,
  updatedOrCreatedTransaction: PropTypes.any,
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ViewTransaction);
