import React from 'react';
import SingleTransactionView from './SingleTransactionView/SingleTransactionView';
import ViewTransaction from './View/ViewTransaction';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
      <Grid className={classes.root}>
        <Button
          className={classes.addButton}
          variant="contained"
          onClick={() => this.showAddTransaction()}
        >
          Add Transaction
        </Button>
        <SingleTransactionView
          editTransaction={this.state.editTransaction}
          updatedOrCreatedTransaction={this.updatedOrCreatedTransaction.bind(this)}
          dialogClosed={this.dialogClosed.bind(this)}
          open={this.state.openSingleTransactionView}
        />
        <ViewTransaction
          editTransaction={this.editTransaction.bind(this)}
          updatedOrCreatedTransaction={this.state.createdOrUpdatedTransaction}
          dialogClosed={this.dialogClosed.bind(this)}
        />
      </Grid>
    );
  }
}
Transaction.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Transaction);
