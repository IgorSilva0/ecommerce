import { File, Filter, ListFilter } from "lucide-react";
import React, { useEffect, useState } from "react";
import { type OrdersDataResponse } from "../utils/types";
import { OrderDetails } from "./orderDetails";
import { ordersToTable, exportTableToCSV, exportToJSON, type OrderExportData } from "./orders";
import { Badge } from "@/ui/shadcn/badge";
import { Button } from "@/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/shadcn/table";
import { Tabs, TabsContent } from "@/ui/shadcn/tabs";

export function OrdersTable({ data }: { data: OrdersDataResponse }) {
	const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(0);
	const [selectedRow, setSelectedRow] = useState<OrderExportData | null>(null);
	const [filterYear, setFilterYear] = useState("2024");
	const [filterStatus, setFilterStatus] = useState("All");
	const [loading, setLoading] = useState(true);
	const dataset = ordersToTable(data, Number(filterYear), filterStatus);
	if (dataset.length && !selectedRow) setSelectedRow(dataset[0] ?? null);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => setLoading(false), 1500);
		return () => clearTimeout(timer);
	}, [filterYear, filterStatus]);

	const handleExport = async (x: boolean) => {
		if (!dataset.length) return;
		try {
			if (x) await exportTableToCSV(dataset);
			else await exportToJSON(dataset);
		} catch (error) {
			console.error("Export error:", error);
		}
	};

	const handleRowClick = (index: number, order: OrderExportData) => {
		setSelectedRowIndex(index);
		setSelectedRow(order);
	};

	return (
		<div className="mt-8 flex flex-col gap-8 lg:flex-row">
			<div className="grid flex-1 auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
				<Tabs defaultValue="all" className="rounded-t-xl border bg-muted/90 shadow">
					<div className="flex items-center p-5 pb-3 sm:px-6">
						<h2 className="text-xl font-semibold">Purchase History</h2>
						<div className="ml-auto flex items-center gap-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm" className="h-7 gap-2 text-sm">
										<ListFilter className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only">{filterStatus}</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Filter by</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuRadioGroup value={filterStatus} onValueChange={setFilterStatus}>
										<DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="Fulfilled">Fulfilled</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="Processing">Processing</DropdownMenuRadioItem>
										<DropdownMenuRadioItem value="Refunded">Refunded</DropdownMenuRadioItem>
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
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm" className="h-7 gap-2 text-sm">
										<File className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only">Export</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={() => handleExport(true)}>
										Export as CSV
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => handleExport(false)}>
										Export as JSON
									</DropdownMenuItem>
									<DropdownMenuSeparator />
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					{!loading ? (
						<TabsContent value="all" className="select-none">
							<Card
								x-chunk="dashboard-05-chunk-3"
								className="fade-down rounded-none border-0 shadow-none"
							>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Dispatch to</TableHead>
												<TableHead className="hidden sm:table-cell">Delivery</TableHead>
												<TableHead className="hidden sm:table-cell">Status</TableHead>
												<TableHead className="hidden md:table-cell">Date</TableHead>
												<TableHead className="text-right">Total</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{dataset.length ? (
												dataset.map((order, index) => (
													<TableRow
														key={index}
														onClick={() => handleRowClick(index, order)}
														className={
															selectedRowIndex === index
																? "cursor-pointer bg-gray-200 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-800"
																: "cursor-pointer"
														}
													>
														<TableCell>
															<div className="font-medium">{order.dispatchedToName}</div>
															<div className="hidden text-sm text-muted-foreground md:inline">
																{order.dispatchedToCity}, {order.dispatchedToCountry}
															</div>
														</TableCell>
														<TableCell className="hidden sm:table-cell">
															<Badge
																className="border-gray-400 dark:border-gray-500"
																variant="secondary"
															>
																{order.deliveryStatus}
															</Badge>
														</TableCell>
														<TableCell className="hidden sm:table-cell">
															<Badge
																className="border-gray-400 dark:border-gray-500"
																variant="secondary"
															>
																{order.orderStatus}
															</Badge>
														</TableCell>
														<TableCell className="hidden md:table-cell">
															{order.orderDate}
														</TableCell>
														<TableCell className="text-right">£ {order.orderTotal}</TableCell>
													</TableRow>
												))
											) : (
												<TableRow>
													<TableCell colSpan={5} className="text-center text-base">
														No orders found.
													</TableCell>
												</TableRow>
											)}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>
					) : (
						<TabsContent value="all" className="fade-down">
							<Card
								x-chunk="dashboard-05-chunk-3"
								className="flex justify-center rounded-none border-0 shadow-none"
							>
								<CardHeader className="px-7">
									<CardTitle className="animate-pulse">Loading...</CardTitle>
								</CardHeader>
							</Card>
						</TabsContent>
					)}
				</Tabs>
			</div>
			<OrderDetails data={data} selectedRow={selectedRow} />
		</div>
	);
}
