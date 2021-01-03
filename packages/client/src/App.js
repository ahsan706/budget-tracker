import React from 'react';
import Transaction from './transactions/Transaction';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AttachMoney from '@material-ui/icons/AttachMoney';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
const styles = () => ({});
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://m-ahsan.com">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <CssBaseline>
        <AppBar position="relative">
          <Toolbar>
            <AttachMoney />
            <Typography variant="h6" color="inherit" noWrap>
              Budget Tracker
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          <Transaction />
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Copyright />
        </footer>
      </CssBaseline>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(App);
