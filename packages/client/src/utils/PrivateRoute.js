import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';

export default function PrivateRoute({ component, ...args }) {
  const { isAuthenticated } = useAuth0();
  if (isAuthenticated) {
    return <Route component={component} {...args} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            redirectTo: useLocation().pathname
          }
        }}
      />
    );
  }
}
PrivateRoute.propTypes = {
  component: PropTypes.any
};
