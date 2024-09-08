"use client";

import { Loader2, EyeOff, Eye, ListFilter, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { OrdersTable } from "./components/ordersTable";
import { type OrdersDataResponse } from "./utils/types";
import { TooltipProvider } from "@/ui/shadcn/tooltip";
import { OrdersChart } from "@/app/myaccount/components/ordersChart";
import { Button } from "@/ui/shadcn/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { OrdersData } from "@/app/myaccount/utils/data";

export default function Orders() {
	const [displayCharts, setDisplayCharts] = useState(true);
	const [ordersData, setOrdersData] = useState<OrdersDataResponse>([]);
	const [filterYear, setFilterYear] = React.useState<string>("2024");
	const [filterType, setFilterType] = React.useState<string>("Orders");
	const [fadeOut, setFadeOut] = useState(false);

	const toggleCharts = () => {
		if (!fadeOut) {
			setFadeOut(true);
			setTimeout(() => {
				setDisplayCharts(!displayCharts);
				setFadeOut(false);
			}, 300);
		} else {
			setDisplayCharts(!displayCharts);
		}
	};

	useEffect(() => {
		const userId = async () => {
			try {
				const data = await OrdersData();
				setOrdersData(data);
			} catch (error) {
				console.error;
			}
		};
		void userId();
	}, []);

	return (
		<TooltipProvider>
			<main className="w-full flex-1 items-start">
				<div className="flex items-center justify-center">
					<Loader2 className="ml-2 h-4 w-4 animate-spin" />
					<h2 className="text-center text-2xl font-semibold">Orders History</h2>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				</div>

				<div className="mt-8 flex w-full items-center justify-between rounded-t-xl border border-b-0 bg-muted/80 px-5 py-4 sm:px-6">
					<h2 className="text-xl font-semibold">Overview Charts</h2>
					<div className="flex gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="h-7 gap-2 text-sm">
									<ListFilter className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only">{filterType}</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuRadioGroup value={filterType} onValueChange={setFilterType}>
									<DropdownMenuRadioItem value="Orders">Orders</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="Amount">Amount</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="h-7 gap-2 text-sm">
									<Filter className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only"> {filterYear} </span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuRadioGroup value={filterYear} onValueChange={setFilterYear}>
									<DropdownMenuRadioItem value="2024">2024</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="2023">2023</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="2022">2022</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button
							variant="outline"
							size="sm"
							className={`h-7 gap-1 text-sm ${fadeOut ? "pointer-events-none" : null}`}
							onClick={() => toggleCharts()}
						>
							{displayCharts ? (
								<div className="flex items-center gap-2">
									<EyeOff className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only">Hide Charts</span>
								</div>
							) : (
								<div className="flex items-center gap-2">
									<Eye className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only">Show Charts</span>
								</div>
							)}
						</Button>
					</div>
				</div>

				{displayCharts ? (
					<div className={`fade-down ${fadeOut ? "fade-out" : ""}`}>
						<OrdersChart data={ordersData} filterYear={filterYear} filterType={filterType} />
					</div>
				) : null}

				<div>
					<OrdersTable data={ordersData} />
				</div>
			</main>
		</TooltipProvider>
	);
}
