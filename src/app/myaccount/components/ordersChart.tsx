import * as React from "react";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { type OrdersDataResponse } from "../utils/types";
import { barDataSet, pieDataSet } from "./charts";

const otherSetting = {
	grid: { horizontal: true },
	sx: {
		[`& .${axisClasses.left} .${axisClasses.label}`]: {
			transform: "translateX(-10px)",
		},
	},
};

export function OrdersChart({
	data,
	filterYear,
	filterType,
}: {
	data: OrdersDataResponse;
	filterYear: React.SetStateAction<string>;
	filterType: React.SetStateAction<string>;
}) {
	const barData = barDataSet(data, Number(filterYear));
	const pieData = pieDataSet(data, Number(filterYear));

	const valueFormatter = (value: string | number | null) =>
		`${
			filterType === "Orders"
				? `${value} orders`
				: `£${value!.toLocaleString("en-GB", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}`
		}`;

	return (
		<div className="grid select-none gap-8 border border-t-0 bg-white/80 object-cover shadow dark:bg-slate-950 md:max-h-[300px] md:grid-cols-4 lg:grid-cols-3">
			<BarChart
				dataset={barData}
				xAxis={[
					{
						scaleType: "band",
						dataKey: "month",
						//label: "Hover to see total spent",
						valueFormatter: (month: string, context) =>
							context.location === "tick"
								? `${month.slice(0, 3)}`
								: filterType === "Orders"
									? `Total spent in ${month} : £${barData
											.find((d) => d.month === month)
											?.value.toLocaleString("en-GB", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}`
									: `Total orders in ${month} : ${
											barData.find((d) => d.month === month)?.orders
										} orders`,
					},
				]}
				barLabel={(item, context) => {
					if (filterType === "Orders") {
						return item.value?.toString();
					}
					return "£";
				}}
				borderRadius={5}
				series={[
					{
						dataKey: `${filterType === "Orders" ? "orders" : "value"}`,
						// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
						label: `Purchase Summary for ${filterYear}`,
						valueFormatter,
						highlightScope: { highlight: "item", fade: "global" },
					},
				]}
				{...otherSetting}
				height={300}
				className="lines-chart custom-fill row-start-2 max-h-[300px] rounded-lg md:col-span-2 md:row-start-1"
			/>

			<PieChart
				series={[
					{
						data: pieData,
						innerRadius: 50,
						outerRadius: 100,
						cornerRadius: 5,
						paddingAngle: 1,
						startAngle: -45,
						endAngle: 315,
						highlightScope: { fade: "global", highlight: "item" },
						faded: { innerRadius: 50, additionalRadius: -5, color: "gray" },
						valueFormatter: (item: { value: number }) => `${item.value} %`,
						cx: "65%",

						arcLabel: (item) => `${item.value}%`,
						arcLabelMinAngle: 20,
						arcLabelRadius: "55%",
						...data,
					},
				]}
				slotProps={{
					legend: {
						direction: "row",
						position: { vertical: "top", horizontal: "middle" },
						padding: 8,
					},
				}}
				height={300}
				className="custom-fill no-stroke md:col-span-2 lg:col-span-1 lg:col-start-3"
			/>
		</div>
	);
}
