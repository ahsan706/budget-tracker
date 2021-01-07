import React from 'react';
import Transaction from './views/MainView';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AttachMoney from '@material-ui/icons/AttachMoney';

const App = () => {
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
      <footer>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Copyright />
      </footer>
    </CssBaseline>
  );
};
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
export default App;
