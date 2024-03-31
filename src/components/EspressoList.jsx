import React, { useState } from "react";

let formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",

	// These options are needed to round to whole numbers if that's what you want.
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const EspressoList = ({ data }) => {
	const totalPrice = data.reduce((total, item) => total + (Number(item.price) || 0), 0);
	const averagePrice = totalPrice / data.length;
	return (
		<div>
			<h1 style={{ marginLeft: "1.5em" }}>☕ Espresso Log 2024</h1>

			<ul style={{ listStyleType: "none", display: "flex", justifyContent: "flex-start" }}>
				<li style={{ marginLeft: "0", marginRight: "1em" }}>Espresso Count: {data.length}</li>
				<li style={{ marginRight: "1em" }}>Total Price: {formatter.format(totalPrice)}</li>
				<li>Average Price: {formatter.format(averagePrice)}</li>
			</ul>
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Place</th>
						<th>Espresso</th>
						<th>Rating</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item) => (
						<>
							<tr>
								<td>
									{new Date(item.timestamp).toLocaleDateString("en-US", {
										month: "short",
										day: "numeric",
										year: "numeric",
									})}
								</td>
								<td>{item.where}</td>
								<td>{item.espresso}</td>
								<td>{item.rating}</td>
								<td>{formatter.format(item.price)}</td>
							</tr>
						</>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default EspressoList;
