import React from 'react';

import { Auth0Provider } from '@auth0/auth0-react';
import CssBaseline from '@mui/material/CssBaseline';
import i18n from 'i18next';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './views/dashBoard/Dashboard';
import Login from './views/login/Login';
import PageNotFound from './views/pageNotFound/PageNotFound';
import LoadingDialog from './views/UIComponents/LoadingDialog';

export default function App() {
  const [translationLoaded, setTranslationLoaded] = React.useState(false);
  React.useEffect(() => {
    if (i18n.isInitialized) {
      setTranslationLoaded(true);
    } else {
      i18n.on('initialized', () => {
        setTranslationLoaded(true);
      });
    }
  }, []);

  return (
    <CssBaseline>
      {translationLoaded ? (
        <BrowserRouter>
          <Auth0Provider
            domain={process.env.REACT_APP_Auth0_Domain}
            clientId={process.env.REACT_APP_Auth0_ClientId}
            authorizationParams={{
              redirect_uri: window.location.origin + '/login',
              audience: process.env.REACT_APP_Auth0_Audience,
              scope: 'read:current_user update:current_user_metadata'
            }}
          >
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Navigate to="/dashboard" replace />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Auth0Provider>
        </BrowserRouter>
      ) : (
        <LoadingDialog open={true} />
      )}
    </CssBaseline>
  );
}
