import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { useAuthContext } from '../context/authContext';
export default function PrivateRoute({ Component, ...rest }) {
  const isAuth = useAuthContext().isAuth;
  if (isAuth) {
    return <Route component={Component} {...rest} />;
  } else {
    return <Redirect to="/login" />;
  }
}
