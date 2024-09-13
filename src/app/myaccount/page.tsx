"use client";

import { EyeOff, Eye, ListFilter, Filter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { type OrdersDataResponse } from "./utils/types";
import { OrdersTable } from "@/ui/MyAccount/ordersTable";
import { TooltipProvider } from "@/ui/shadcn/tooltip";
import { OrdersChart } from "@/ui/MyAccount/ordersChart";
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
import { YnsLink } from "@/ui/YnsLink";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/ui/shadcn/breadcrumb";

export default function Orders() {
	const [displayCharts, setDisplayCharts] = useState(true);
	const [ordersData, setOrdersData] = useState<OrdersDataResponse>([]);
	const [filterYear, setFilterYear] = useState<string>("2024");
	const [filterType, setFilterType] = useState<string>("Orders");
	const [fadeOut, setFadeOut] = useState(false);
	const [loading, setLoading] = useState(true);
	const [startShopping, setStartShopping] = useState(false);

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

	useEffect(() => {
		const timer = () => {
			setLoading(true);
			const loadingTimeout = setTimeout(() => {
				setLoading(false);
				setTimeout(() => {
					setStartShopping(true);
				}, 3000);
			}, 2000);
			return () => {
				clearTimeout(loadingTimeout);
			};
		};
		timer();
	}, []);

	return (
		<TooltipProvider>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							asChild
							className="inline-flex min-h-12 min-w-12 items-center justify-center"
						>
							<YnsLink href="/">Home</YnsLink>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>Dashboard</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<main className="mb-20 w-full flex-1 items-start">
				<div className="">
					<h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
						Orders History
					</h1>
				</div>
				{!loading && !ordersData.length && startShopping ? (
					<>
						<p className="my-2 py-3 text-base text-gray-600 dark:text-gray-400">
							You haven&apos;t completed any purchases so far.
						</p>
						<div className="flex w-full">
							<YnsLink
								href="/products"
								className="bg-primary-500 w-fit rounded-lg border-2 border-black bg-black px-10 py-2 text-base font-semibold text-white transition-all hover:bg-transparent hover:text-black dark:border-white dark:bg-transparent dark:hover:bg-white dark:hover:text-black"
							>
								Start Shopping!
							</YnsLink>
						</div>
					</>
				) : null}
				<div className="mt-8 flex w-full items-center justify-between rounded-t-xl border border-b-0 bg-muted/90 p-5 sm:px-6">
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
				{loading ? (
					<div className="flex items-center justify-center border border-t-0 bg-white/80 py-6 shadow dark:bg-slate-950">
						<span className="animate-pulse font-semibold">Loading...</span>
					</div>
				) : ordersData.length && displayCharts ? (
					<div className={`fade-down ${fadeOut ? "fade-out" : ""}`}>
						<OrdersChart data={ordersData} filterYear={filterYear} filterType={filterType} />
					</div>
				) : !displayCharts ? null : (
					<div className="fade-down flex items-center justify-center border border-t-0 bg-white/80 py-6 shadow dark:bg-slate-950">
						<span>No data found.</span>
					</div>
				)}
				<div>
					<OrdersTable data={ordersData} />
				</div>
			</main>
		</TooltipProvider>
	);
}
