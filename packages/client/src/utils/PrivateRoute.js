import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node
};
