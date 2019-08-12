import React, { useState, useEffect } from "react";
import Axios from "axios";

function Show(props) {
  const [bankAccount, setBankAccount] = useState([]);

  useEffect(() => {
    Axios.get(`/api/bankAccounts/${props.match.params.id}`)
      .then(result => {
        console.log(result);
        setBankAccount(result.data);
      })
      .catch(err => console.error(err));
  }, [props]);

  return (
    <div className="container">
      <header>
        <h1>{bankAccount && bankAccount.clientName}</h1>
      </header>

      <div>
        {bankAccount && bankAccount.accountName}
      </div>
      <div>
        {bankAccount && bankAccount.description}
      </div>
      <div>
        {bankAccount && bankAccount.balance}
      </div>
      <div>
        {bankAccount && bankAccount.accountType}
      </div>
    </div>
  );
}

export default Show;