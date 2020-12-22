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
import {withStyles} from '@material-ui/core/styles';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const styles = () => ({
  root: {
    width: '100%',
  },
});
class ViewTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (props.updatedOrCreatedTransaction !== undefined) {
      const newState = {
        transactions: [...state.transactions],
      };
      newState.transactions[props.updatedOrCreatedTransaction.id] =
        props.updatedOrCreatedTransaction;
      return newState;
    }
    return state;
  }
  async componentDidMount() {
    const response = await (
      await fetch('http://localhost:8080/getAllTransaction')
    ).json();
    this.setState({transactions: response});
  }
  onEditTransaction(id) {
    this.props.editTransaction(
        this.state.transactions.find((transaction) => transaction.id === id),
    );
  }
  async onDeleteTransaction(id) {
    await fetch('http://localhost:8080/deleteTransaction', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id}),
    });
    const transactions = [...this.state.transactions];
    const indexOfTransaction = transactions.findIndex(
        (transaction) => transaction.id === id,
    );
    transactions.splice(indexOfTransaction, 1);
    this.setState({transactions});
  }
  renderTableData(transactions) {
    const tableList = [];
    tableList.push();
    const tableData = transactions.map((transaction) => {
      const {id, description, amount, transactionDate} = transaction;
      return (
        <StyledTableRow key={id}>
          <StyledTableCell>{description}</StyledTableCell>
          <StyledTableCell>{amount}</StyledTableCell>
          <StyledTableCell>
            <Grid container>
              <Grid item xs={9}>
                <Typography>{transactionDate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={5}>
                    <IconButton onClick={() => this.onEditTransaction(id)}>
                      <EditIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={5}>
                    <IconButton onClick={() => this.onDeleteTransaction(id)}>
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
  }
  render() {
    return (
      <TableContainer
        className={this.props.classes.root}
        aria-label="customized table"
      >
        <Table>
          <TableHead>
            <StyledTableRow key="header">
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Transaction Date</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>{this.renderTableData(this.state.transactions)}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}
ViewTransaction.propTypes = {
  editTransaction: PropTypes.func,
  deleteTransaction: PropTypes.func,
  transactionDate: PropTypes.string,
  updatedOrCreatedTransaction: PropTypes.any,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ViewTransaction);
