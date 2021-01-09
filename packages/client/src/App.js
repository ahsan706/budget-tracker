import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import i18n from 'i18next';

import Footer from './views/footer/Footer';
import Header from './views/header/Header';
import Transaction from './views/mainView/MainView';
import LoadingDialog from './views/UIComponents/LoadingDialog';
const App = () => {
  const [translationLoaded, setTranslationLoaded] = React.useState(false);
  i18n.on('initialized', (options) => {
    setTranslationLoaded(true);
  });
  return translationLoaded ? (
    <CssBaseline>
      <header>
        <Header />
      </header>
      <main>
        <Transaction />
      </main>
      <footer>
        <Footer />
      </footer>
    </CssBaseline>
  ) : (
    <LoadingDialog open={true} />
  );
};
export default App;
