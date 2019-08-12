import React, { useState, useEffect } from "react";
import Axios from "axios";

function Index() {
	const [bankAccounts, setBankAccounts] = useState([]);

	useEffect(() => {
		Axios.get('/api/bankAccounts')
		.then(result => {
			setBankAccounts(result.data);
		})
		.catch(err => console.error(err));
	}, []);

	return(
		<div className="container">
			<header>
				<h1>Bank Account List</h1>
			</header>

			<div>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
							<th>Account</th>
							<th>Description</th>
							<th>Balance</th>
							<th>Type</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						{bankAccounts.map(bankAccount => (
							<tr key={bankAccount._id}>
								<td><a href={`/${bankAccount._id}`}>{bankAccount.clientName}</a></td>
								<td>{bankAccount.accountName}</td>
								<td>{bankAccount.description}</td>
								<td>{bankAccount.balance}</td>
								<td>{bankAccount.accountType}</td>
								<td>
									<a href={`/${bankAccount._id}/destroy`}>Delete</a> |
									<a href={`/${bankAccount._id}/edit`}>Edit</a>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Index;