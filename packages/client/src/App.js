import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import i18n from 'i18next';

import Dashboard from './views/dashBoard/Dashboard';
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
      {translationLoaded ? <Dashboard /> : <LoadingDialog open={true} />}
    </CssBaseline>
  );
}
