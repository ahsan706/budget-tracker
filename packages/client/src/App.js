import React from 'react';
import './App.css';
import Transaction from './transactions/Transaction';

class App extends React.Component {
  render() {
    return (
      <div className="grid-container">
        <div className="header">Header</div>
        <div className="main"><Transaction/></div>  
        <div className="footer">Footer</div>
      </div>
    );
  }
}

export default App;
