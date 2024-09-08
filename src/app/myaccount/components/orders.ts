import { type OrdersDataResponse } from "@/app/myaccount/utils/types";

export type OrderExportData = {
	order_id: string;
	dispatchedToName: string | undefined;
	dispatchedToCity: string | undefined;
	dispatchedToCountry: string | undefined;
	deliveryStatus: string;
	orderStatus: string;
	orderDate: string;
	orderTotal: string;
};

const formatDate = (x: string) => new Date(x).toISOString().slice(0, 10).replace(/-/g, "/");

export function ordersToTable(data: OrdersDataResponse, filterYear: number, filterStatus: string) {
	// Creates a dataset with the required fields
	const dataset = data.map((order) => ({
		order_id: order.order_id,
		dispatchedToName: order.shipping_details[0]?.name,
		dispatchedToCity: order.shipping_details[0]?.address.city,
		dispatchedToCountry: order.shipping_details[0]?.address.country,
		deliveryStatus: order.delivery_status,
		orderStatus: order.order_status,
		orderDate: formatDate(order.created_at),
		orderTotal: order.total_price.toLocaleString("gbp-GB", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}),
	}));

	// Filter by year and status
	const filteredData = dataset.filter((item) => {
		const year = new Date(item.orderDate).getFullYear();
		const isYearValid = filterYear === year;
		const isStatusValid = filterStatus === "All" ? true : filterStatus.includes(item.orderStatus);

		return isYearValid && isStatusValid;
	});

	// Sort by orderDate in descending order
	const sortedData = filteredData.sort(
		(a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
	);

	return sortedData;
}

export const exportToCSV = (data: OrderExportData[], filename = "orders.csv") => {
	const csvContent =
		"data:text/csv;charset=utf-8," +
		data
			.map((row) =>
				[
					row.order_id,
					row.dispatchedToName,
					row.dispatchedToCity,
					row.dispatchedToCountry,
					row.deliveryStatus,
					row.orderStatus,
					row.orderDate,
					row.orderTotal,
				].join(","),
			)
			.join("\n");

	const link = document.createElement("a");
	link.setAttribute("href", encodeURI(csvContent));
	link.setAttribute("download", filename);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const exportToJSON = (data: OrderExportData[], filename = "orders.json") => {
	// Convert the data array to a JSON string
	const jsonContent = JSON.stringify(data, null, 2);

	// Create a Blob object with the JSON content
	const blob = new Blob([jsonContent], { type: "application/json" });

	// Create a URL for the Blob and set it as the href attribute of a download link
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.setAttribute("download", filename);

	// Append the link to the document, trigger a click, and remove it
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
