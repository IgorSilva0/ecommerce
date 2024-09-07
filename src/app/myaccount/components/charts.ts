import { type OrdersDataResponse } from "../utils/types";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export function barDataSet(data: OrdersDataResponse, selectedYear: number) {
	const dataset = months.map((month) => ({
		month,
		year: selectedYear,
		value: 0, // Price spent that month
		orders: 0, // How many purchases made that month
	}));

	// Iterate over the data and populate the dataset
	data.forEach((order) => {
		const createdAt = new Date(order.created_at);
		const month = months[createdAt.getUTCMonth()]; // Get the month name based on the date
		const year = createdAt.getUTCFullYear(); // Get the year from the date

		// Find the correct month object in the dataset
		const monthData = dataset.find((d) => d.month === month);

		if (monthData && year === selectedYear) {
			// Update the value for 2024
			monthData.value += order.total_price;
			monthData.orders++;
		}
	});

	return dataset;
}

export function pieDataSet(data: OrdersDataResponse, selectedYear: number) {
	const num = 4801 / 100;

	console.log(num);
	return null;
}
