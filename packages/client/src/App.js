import React from 'react';
import Transaction from './transactions/Transaction';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";

const styles = () => ({
  root: {
    height: "100vh"
  },
  header:{
    height: "10vh"
  },
  footer:{
    height: "10vh"
  }
});
class App extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <CssBaseline>
        <Grid container direction="column" className={classes.root}>
        <Grid item className={classes.header} >Header</Grid>
        <Transaction className={classes.main}/>  
        <Grid item className={classes.footer}>Footer</Grid>
        </Grid>
      </CssBaseline>
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(App);
