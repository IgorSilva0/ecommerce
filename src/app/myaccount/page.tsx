"use client";

import { Loader2 } from "lucide-react";
import { OrdersTable } from "./components/ordersTable";
import { TooltipProvider } from "@/ui/shadcn/tooltip";
import { OrderDetails } from "@/app/myaccount/components/orderDetails";
import { OrdersChart } from "@/app/myaccount/components/ordersChart";

export default function Orders() {
	return (
		<TooltipProvider>
			<main className="w-full flex-1 items-start">
				<div className="flex items-center justify-center">
					<Loader2 className="ml-2 h-4 w-4 animate-spin" />
					<h2 className="text-center text-2xl font-semibold">Orders History</h2>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				</div>
				<OrdersChart />
				<div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
					<OrdersTable />
					<OrderDetails />
				</div>
			</main>
		</TooltipProvider>
	);
}
