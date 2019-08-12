import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Edit(props) {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Axios.get(`/api/bankAccounts/${props.match.params.id}`)
      .then(result => {
        setInputs({
          clientName: result.data.clientName,
          accountName: result.data.accountName,
          description: result.data.description,
          balance: result.data.balance,
          accountType: result.data.accountType
        });
      })
      .catch(err => console.error(err));
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post(
      '/api/bankAccounts/update', inputs
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
      inputs[name] = value;
      return inputs;
    });
  }

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <header>
        <h1>Edit Bank Account Post</h1>
      </header>
      <div>
        <form action="/bankAccounts" method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Client Name</label>
            <input className="form-control" name="clientName" required="required" onChange={handleInputChange} defaultValue={inputs.clientName} />
          </div>

          <div className="form-group">
            <label>Account Name</label>
            <input className="form-control" name="accountName" onChange={handleInputChange} value={inputs.accountName} />
          </div>

          <div className="form-group">
            <label>Description</label>
            <input className="form-control" name="description" onChange={handleInputChange} value={inputs.description} />
          </div>

          <div className="form-group">
            <label>Balance</label>
            <input className="form-control" name="balance" onChange={handleInputChange} value={inputs.balance} />
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

export default Edit;