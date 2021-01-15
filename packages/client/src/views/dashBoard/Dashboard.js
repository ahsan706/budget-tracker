import React from 'react';

import Footer from './footer/Footer';
import Header from './header/Header';
import MainView from './mainView/MainView';
export default function Dashboard(props) {
  return (
    <React.Fragment>
      <header>
        <Header {...props} />
      </header>
      <main>
        <MainView />
      </main>
      <footer>
        <Footer />
      </footer>
    </React.Fragment>
  );
}
