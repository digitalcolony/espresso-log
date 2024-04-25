import React, { useState } from "react";
import Table from "react-bootstrap/cjs/Table.js";
import "bootstrap/dist/css/bootstrap.min.css";

let formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",

	// These options are needed to round to whole numbers if that's what you want.
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
});

const EspressoGrid = ({ data }) => {
	const totalPrice = data.reduce((total, item) => total + (Number(item.price) || 0), 0);
	const averagePrice = totalPrice / data.length;
	const totalStars = data.reduce((rating, item) => rating + (item.rating.length || 0), 0);
	const averageRating = Number((totalStars / data.length).toFixed(2));

	return (
		<div className="container-md">
			<h1 style={{ marginLeft: "1.5em", marginTop: "0.5em", font: "monospace" }}>
				☕ Espresso Log 2024
			</h1>

			<ul style={{ listStyleType: "none", display: "flex", justifyContent: "flex-start" }}>
				<li style={{ marginLeft: "0", marginRight: "1em" }}>Count: {data.length}</li>
				<li style={{ marginRight: "1em" }}>Total: {formatter.format(totalPrice)}</li>
				<li>Average Price: {formatter.format(averagePrice)}</li>
				<li style={{ marginLeft: "1em", marginRight: "1em" }}>Average Rating: {averageRating}</li>
			</ul>
			<div style={{ overflow: "auto", maxHeight: "90vh" }}>
				<Table striped bordered hover size="sm">
					<thead style={{ position: "sticky", top: "0", backgroundColor: "#f8f9fa" }}>
						<tr>
							<th>Date</th>
							<th>Place</th>
							<th>Espresso</th>
							<th>Rating</th>
							<th className="d-none d-sm-table-cell">Price</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item) => (
							<tr key={item.timestamp}>
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
								<td className="d-none d-sm-table-cell">{formatter.format(item.price)}</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default EspressoGrid;
