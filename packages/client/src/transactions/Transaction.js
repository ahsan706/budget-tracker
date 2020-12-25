import React from 'react';
import SingleTransactionView from './SingleTransactionView/SingleTransactionView';
import ViewTransaction from './View/ViewTransaction';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
const styles = (theme) => ({
  root: {
    height: '80vh',
    padding: '5%'
  },
  addButton: {
    'margin-bottom': theme.spacing(2)
  }
});
class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editTransaction: undefined,
      createdOrUpdatedTransaction: undefined,
      openSingleTransactionView: false
    };
  }
  showAddTransaction() {
    this.setState({
      openSingleTransactionView: true
    });
  }
  editTransaction(editTransaction) {
    this.setState({
      editTransaction: editTransaction,
      openSingleTransactionView: true
    });
  }
  dialogClosed() {
    this.setState({ editTransaction: undefined, openSingleTransactionView: false });
  }
  updatedOrCreatedTransaction(transaction) {
    this.setState({ createdOrUpdatedTransaction: transaction });
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.root} component={Paper}>
        <Button
          className={classes.addButton}
          variant="contained"
          onClick={() => this.showAddTransaction()}>
          Add Transaction
        </Button>
        <SingleTransactionView
          editTransaction={this.state.editTransaction}
          updatedOrCreatedTransaction={(transaction) =>
            this.updatedOrCreatedTransaction(transaction)
          }
          dialogClosed={() => this.dialogClosed()}
          open={this.state.openSingleTransactionView}
        />
        <ViewTransaction
          editTransaction={(editTransaction) =>
            this.editTransaction(editTransaction)
          }
          updatedOrCreatedTransaction={this.state.createdOrUpdatedTransaction}
          dialogClosed={() => this.dialogClosed()}
        />
      </Grid>
    );
  }
}
Transaction.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Transaction);
