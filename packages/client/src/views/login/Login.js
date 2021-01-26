import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import LoadingDialog from '../UIComponents/LoadingDialog';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    'justify-content': 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Login(props) {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const classes = useStyles();
  const onSignInClicked = (event) => {
    event.preventDefault();
    loginWithRedirect({
      redirectUri: window.location.origin + '/login',
      appState: props.location.state
    });
  };
  return isLoading ? (
    <LoadingDialog open={true} />
  ) : isAuthenticated ? (
    <Redirect
      to={
        props.location.state && props.location.state.redirectTo
          ? props.location.state.redirectTo
          : '/'
      }
    />
  ) : (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Authenticate Your Self Before Using App.
          </Typography>
          <form className={classes.form} noValidate>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSignInClicked}>
              Authenticate
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
Login.propTypes = {
  location: PropTypes.any
};
