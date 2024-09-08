import { type OrdersDataResponse } from "@/app/myaccount/utils/types";

const formatDate = (x: string) => new Date(x).toISOString().slice(0, 10).replace(/-/g, "/");

export function ordersToTable(
	data: OrdersDataResponse,
	filterYear: number,
	filterStatus: string,
	dateRange: string,
) {
	// Creates a dataset with the required fields
	const dataset = data.map((order) => ({
		dispatchedToName: order.shipping_details[0]?.name,
		dispatchedToCity: order.shipping_details[0]?.address.city,
		dispatchedToCountry: order.shipping_details[0]?.address.country,
		deliveryStatus: order.delivery_status,
		orderStatus: order.order_status,
		orderDate: formatDate(order.created_at),
		orderTotal: order.total_price,
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

	console.log(sortedData);

	return sortedData;
}
