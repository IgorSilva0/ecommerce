import { File, Filter, ListFilter } from "lucide-react";
import React, { useState } from "react";
import { type OrdersDataResponse } from "../utils/types";
import { OrderDetails } from "./orderDetails";
import { Badge } from "@/ui/shadcn/badge";
import { Button } from "@/ui/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/shadcn/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/ui/shadcn/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/shadcn/tabs";
//import { ordersToTable } from "@/app/myaccount/components/orders";

export function OrdersTable({ data }: { data: OrdersDataResponse }) {
	const [filterYear, setFilterYear] = useState("2024");
	const [filterStatus, setFilterStatus] = useState("All");

	//const [dateRange, setDateRange] = useState("Year");

	//const dataset = ordersToTable(data, Number(filterYear), filterStatus, dateRange);
	return (
		<div className="mt-8 flex flex-col gap-8 lg:flex-row">
			<div className="grid flex-1 auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
				<Tabs defaultValue="Year" className="rounded-t-xl border bg-muted/70 shadow">
					<div className="flex items-center px-5 pb-3 pt-5">
						<TabsList>
							<TabsTrigger value="Week">Week</TabsTrigger>
							<TabsTrigger value="Month">Month</TabsTrigger>
							<TabsTrigger value="Year">Year</TabsTrigger>
						</TabsList>
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
							<Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
								<File className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only">Export</span>
							</Button>
						</div>
					</div>
					<TabsContent value="Year">
						<Card x-chunk="dashboard-05-chunk-3" className="rounded-none border-0 shadow-none">
							<CardHeader className="px-7">
								<CardTitle>Orders</CardTitle>
								<CardDescription>Your Recent Orders.</CardDescription>
							</CardHeader>
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
										<TableRow className="bg-accent">
											<TableCell>
												<div className="font-medium">Liam Johnson</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													liam@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">Sale</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">2023-06-23</TableCell>
											<TableCell className="text-right">$250.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Olivia Smith</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													olivia@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">Refund</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="outline">
													Declined
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">2023-06-24</TableCell>
											<TableCell className="text-right">$150.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Noah Williams</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													noah@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">Subscription</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">2023-06-25</TableCell>
											<TableCell className="text-right">$350.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Emma Brown</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													emma@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">Sale</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">2023-06-26</TableCell>
											<TableCell className="text-right">$450.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Liam Johnson</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													liam@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">Sale</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">2023-06-23</TableCell>
											<TableCell className="text-right">$250.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Liam Johnson</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													liam@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">Sale</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">2023-06-23</TableCell>
											<TableCell className="text-right">$250.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Olivia Smith</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													olivia@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">Refund</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="outline">
													Declined
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">2023-06-24</TableCell>
											<TableCell className="text-right">$150.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Emma Brown</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													emma@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">Sale</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">2023-06-26</TableCell>
											<TableCell className="text-right">$450.00</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
			<OrderDetails data={data} />
		</div>
	);
}
