import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function New() {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post(
      '/api/bankAccounts', inputs
    )
      .then(resp => {
        console.log(resp);
        setRedirect(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleInputChange(event) {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;

    setInputs(inputs => {
      // Below is a shallow merge. It takes the original inputs value and merges in the new object key and value using the spread operator
      return {
        ...inputs, [name]: value
      }
    });
  }

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <header>
        <h1>Add a New Account</h1>
      </header>
      <div>
        <form action="/api/bankAccounts" method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Client Name</label>
            <input className="form-control" name="clientName" required="required" onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label>Account Name</label>
            <input className="form-control" name="accountName" onChange={handleInputChange}></input>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input className="form-control" name="description" onChange={handleInputChange}></input>
          </div>

          <div className="form-group">
            <label>Balance</label>
            <input className="form-control" name="balance" onChange={handleInputChange}></input>
          </div>

          <div className="form-group">
            <label>Account Type</label>
            <select className="form-control" name="accountType" required="required" onChange={handleInputChange}>
              <option value="CHEQUING">Chequing</option>
              <option value="SAVINGS">Saving</option>
              <option value="TFSA">TFSA</option>
            </select>
          </div>

          <div className="form-group">
            <button className="btn btn-dark" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New;