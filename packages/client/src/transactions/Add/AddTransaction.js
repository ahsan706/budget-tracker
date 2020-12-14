import React from 'react';
import './AddTransaction.css'
class AddTransaction extends React.Component {
  render() {
    return (
      <div className="AddTransaction">
        <form>
        <label>
            Description
        </label>
        <input type="text"/>
        <label>
            Amount
        </label>
        <input type="text"/>
        <label>
            Date
        </label>
        <input type="date"/>
        <input type="submit" value="Add" className="bigMarginV"/>
        </form>
      </div>
    );
  }
}

export default AddTransaction;
