import React from 'react';

import { Auth0Provider } from '@auth0/auth0-react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createBrowserHistory } from 'history';
import i18n from 'i18next';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './views/dashBoard/Dashboard';
import Login from './views/login/Login';
import PageNotFound from './views/pageNotFound/PageNotFound';
import LoadingDialog from './views/UIComponents/LoadingDialog';
export const history = createBrowserHistory();
const onRedirectCallback = (appState) => {
  // Use the router's history module to replace the url
  history.replace(appState?.redirectTo || window.location.pathname);
};

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
        <Auth0Provider
          domain={process.env.REACT_APP_Auth0_Domain}
          clientId={process.env.REACT_APP_Auth0_ClientId}
          redirectUri={window.location.origin + '/login'}
          onRedirectCallback={onRedirectCallback}
          audience={process.env.REACT_APP_Auth0_Audience}
          scope="read:current_user update:current_user_metadata">
          <Router history={history}>
            <Switch>
              <PrivateRoute
                path="/"
                exact
                render={() => {
                  return <Redirect to="/dashboard" />;
                }}
              />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route component={PageNotFound} />
            </Switch>
          </Router>
        </Auth0Provider>
      ) : (
        <LoadingDialog open={true} />
      )}
    </CssBaseline>
  );
}
