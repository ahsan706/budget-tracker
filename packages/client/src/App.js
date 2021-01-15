import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import i18n from 'i18next';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './views/dashBoard/Dashboard';
import Login from './views/login/Login';
import SignUp from './views/signup/SignUp';
import LoadingDialog from './views/UIComponents/LoadingDialog';
export default function App() {
  const [translationLoaded, setTranslationLoaded] = React.useState(false);
  React.useEffect(() => {
    i18n.on('initialized', () => {
      setTranslationLoaded(true);
    });
  }, []);
  return (
    <CssBaseline>
      {translationLoaded ? (
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute path="/" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      ) : (
        <LoadingDialog open={true} />
      )}
    </CssBaseline>
  );
}
