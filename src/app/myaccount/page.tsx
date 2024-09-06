"use client";

import { Loader2, EyeOff, Eye, ListFilter } from "lucide-react";
import { OrdersTable } from "./components/ordersTable";
import { TooltipProvider } from "@/ui/shadcn/tooltip";
import { OrderDetails } from "@/app/myaccount/components/orderDetails";
import { OrdersChart } from "@/app/myaccount/components/ordersChart";
import { Button } from "@/ui/shadcn/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";

export default function Orders() {
	return (
		<TooltipProvider>
			<main className="w-full flex-1 items-start">
				<div className="flex items-center justify-center">
					<Loader2 className="ml-2 h-4 w-4 animate-spin" />
					<h2 className="text-center text-2xl font-semibold">Orders History</h2>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				</div>

				<div className="mt-8 flex w-full items-center justify-between rounded-t-xl border bg-muted/70 px-5 py-4 sm:px-6">
					<h2 className="text-xl font-semibold">Overview Charts</h2>
					<div className="flex gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
									<ListFilter className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only">Filter</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Filter by</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
								<DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
							<EyeOff className="h-3.5 w-3.5" />
							<Eye className="h-3.5 w-3.5" />
							<span className="">Hide Chart</span>
						</Button>
					</div>
				</div>

				<div className="">
					<OrdersChart />
				</div>

				<div className="mt-8 flex flex-col gap-8 lg:flex-row">
					<OrdersTable />
					<OrderDetails />
				</div>
			</main>
		</TooltipProvider>
	);
}
