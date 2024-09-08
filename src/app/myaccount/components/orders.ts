import { type Order, type OrdersDataResponse } from "../utils/types";

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

const formatDate = (x: string) =>
	new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "numeric", day: "numeric" }).format(
		new Date(x),
	);

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

//////////// Export from OrdersTable to .CSV /////////////

export const exportTableToCSV = async (data: OrderExportData[], filename = `order.csv`) => {
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

//////////// Export from OrderDetails .CSV /////////////

export const exportOrderDetailsToCSV = async (data: Order, filename = "order.csv") => {
	// Define the CSV headers
	const headers = [
		"ID",
		"User ID",
		"Order ID",
		"Product Names",
		"Quantity",
		"Total Price",
		"Delivery Status",
		"Order Date",
		"Currency",
		"Shipping City",
		"Shipping Country",
	];

	// Convert a single Order object to a CSV row
	const convertToCSVRow = (row: Order) =>
		[
			row.id,
			row.order_id,
			row.items.map((item) => item.product.name).join("; "),
			row.items.reduce((sum, item) => sum + item.quantity, 0),
			row.total_price.toFixed(2),
			row.delivery_status,
			new Date(row.created_at).toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}),
			row.currency.toUpperCase(),
			row.shipping_details[0]?.address.city ?? "",
			row.shipping_details[0]?.address.country ?? "",
		].join(",");

	// Create the CSV content for a single Order
	const csvContent =
		"data:text/csv;charset=utf-8," + [headers.join(","), convertToCSVRow(data)].join("\n");

	// Create a link element and set its href to the CSV content
	const link = document.createElement("a");
	link.href = encodeURI(csvContent);
	link.download = filename;

	// Append the link to the document body, click it to trigger download, then remove it
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

///////////// Export Json ////////////

export const exportToJSON = async (data: OrderExportData[] | Order, filename = "order.json") => {
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
