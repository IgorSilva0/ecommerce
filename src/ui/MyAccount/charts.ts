import { type OrdersDataResponse } from "../../app/myaccount/utils/types";

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

const categorys = ["electronics", "fashion", "sports"];

export function pieDataSet(data: OrdersDataResponse, selectedYear: number) {
	const dataset = categorys.map((category) => ({
		category,
		orders: 0, // Orders made in that category
		year: selectedYear,
	}));

	data.forEach((order) => {
		const createdAt = new Date(order.created_at);
		const year = createdAt.getUTCFullYear();

		order.items.forEach((item) => {
			const category = item.product.metadata.category;
			const categoryData = dataset.find((d) => d.category === category);

			if (categoryData && year === selectedYear) {
				categoryData.orders++;
			}
		});
	});

	// Calculate total orders for the selected year
	const totalOrders = dataset.reduce((sum, entry) => sum + entry.orders, 0);

	// Transform the dataset into the final pie chart format
	const pieChartData = dataset.map((entry) => {
		const percentage = totalOrders > 0 ? (entry.orders / totalOrders) * 100 : 0;
		return {
			value: parseFloat(percentage.toFixed(2)), // ensure the value is a float with 2 decimal places
			label: entry.category.charAt(0).toUpperCase() + entry.category.slice(1), // capitalize the label
		};
	});

	return pieChartData;
}
