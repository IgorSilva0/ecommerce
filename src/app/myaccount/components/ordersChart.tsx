import * as React from "react";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

const otherSetting = {
	yAxis: [{ label: "rainfall (mm)" }],
	grid: { horizontal: true },
	sx: {
		[`& .${axisClasses.left} .${axisClasses.label}`]: {
			transform: "translateX(-10px)",
		},
	},
};

const dataset = [
	{
		london: 59,
		paris: 57,
		newYork: 86,
		seoul: 21,
		month: "January",
	},
	{
		london: 50,
		paris: 52,
		newYork: 78,
		seoul: 28,
		month: "February",
	},
	{
		london: 47,
		paris: 53,
		newYork: 106,
		seoul: 41,
		month: "March",
	},
	{
		london: 54,
		paris: 56,
		newYork: 92,
		seoul: 73,
		month: "April",
	},
	{
		london: 57,
		paris: 69,
		newYork: 92,
		seoul: 99,
		month: "May",
	},
	{
		london: 60,
		paris: 63,
		newYork: 103,
		seoul: 144,
		month: "June",
	},
	{
		london: 59,
		paris: 60,
		newYork: 105,
		seoul: 319,
		month: "July",
	},
	{
		london: 65,
		paris: 60,
		newYork: 106,
		seoul: 249,
		month: "August",
	},
	{
		london: 51,
		paris: 51,
		newYork: 95,
		seoul: 131,
		month: "September",
	},
	{
		london: 60,
		paris: 65,
		newYork: 97,
		seoul: 55,
		month: "October",
	},
	{
		london: 67,
		paris: 64,
		newYork: 76,
		seoul: 48,
		month: "November",
	},
	{
		london: 61,
		paris: 70,
		newYork: 103,
		seoul: 25,
		month: "December",
	},
];

const valueFormatter = (value: number | null) => `${value}mm`;

export function OrdersChart() {
	return (
		<div className="grid select-none gap-8 border bg-muted/70 object-cover shadow dark:bg-slate-950 md:max-h-[300px] md:grid-cols-4 lg:grid-cols-3">
			<BarChart
				dataset={dataset}
				xAxis={[
					{
						scaleType: "band",
						dataKey: "month",
						valueFormatter: (month, context) =>
							context.location === "tick"
								? // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
									`${month.slice(0, 3)} \n2023`
								: `${month} 2023`,
					},
				]}
				barLabel={"value"}
				borderRadius={5}
				series={[
					{
						dataKey: "seoul",
						label: "Seoul rainfall",
						valueFormatter,
						highlightScope: { highlight: "item", fade: "global" },
					},
				]}
				{...otherSetting}
				height={300}
				className="lines-chart custom-fill row-start-2 ml-5 max-h-[300px] rounded-lg md:col-span-2 md:row-start-1"
			/>

			<PieChart
				series={[
					{
						data: [
							{ value: 10.5, label: "Example A" },
							{ value: 15.73, label: "Example B" },
							{ value: 20.31, label: "Example C" },
						],

						innerRadius: 50,
						outerRadius: 100,
						paddingAngle: 5,
						cornerRadius: 5,
						startAngle: -45,
						highlightScope: { fade: "global", highlight: "item" },
						faded: { innerRadius: 50, additionalRadius: -5, color: "gray" },
						cx: "65%",
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
