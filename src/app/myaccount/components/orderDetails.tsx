import { ChevronLeft, ChevronRight, Copy, CreditCard, MoreVertical, Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import { type OrdersDataResponse, type Order } from "../utils/types";
import { exportOrderDetailsToCSV, exportToJSON, type OrderExportData } from "./orders";
import { Button } from "@/ui/shadcn/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/ui/shadcn/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/ui/shadcn/dropdown-menu";
import { Pagination, PaginationContent, PaginationItem } from "@/ui/shadcn/pagination";
import { Separator } from "@/ui/shadcn/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/shadcn/tooltip";

const formatDate = (x: string) =>
	new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "numeric" }).format(
		new Date(x),
	);
const formatPrice = (value: number): string =>
	new Intl.NumberFormat("gbp-GB", { style: "currency", currency: "GBP" }).format(value / 100);

export function OrderDetails({
	data,
	selectedRow,
}: {
	data: OrdersDataResponse;
	selectedRow: OrderExportData | null;
}) {
	const [order, setOrder] = useState<Order | undefined>(undefined);
	const [copyOrderId, setCopyOrderId] = useState(false);
	const [date, setDate] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (selectedRow) {
			try {
				const order = data.find((order) => order.order_id === selectedRow.order_id);
				if (order) setDate(formatDate(order.created_at));
				setOrder(order);
				console.log(order);
			} catch (error) {
				console.error("Error on SelectedRow,data Use Effect:", error);
			}
		}
	}, [selectedRow, data]);

	const handleExport = async (type: boolean) => {
		if (!order) return;
		try {
			if (type)
				await exportOrderDetailsToCSV(order); // Await if async
			else await exportToJSON(order); // Await if async
		} catch (error) {
			console.error("Export error:", error);
		}
	};

	const handleCopy = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopyOrderId(true);
			setTimeout(() => setCopyOrderId(false), 1500);
		} catch (error) {
			console.error("Failed to copy text to clipboard:", error);
		}
	};

	return (
		<div className="flex justify-center">
			<Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
				<CardHeader className="flex flex-row items-start bg-muted/90 p-5 sm:px-6">
					<div className="grid gap-0.5 fade-in">
						<CardTitle className="group flex items-center gap-2 text-lg">
							Order id:
							<div className="rounded bg-gray-200 px-1 py-1 text-xs dark:bg-slate-950">
								{order ? (
									<>
										<TooltipProvider>
											<Tooltip delayDuration={100}>
												<TooltipTrigger asChild>
													<span
														onClick={() => handleCopy(order.order_id)}
														className="flex cursor-pointer items-center gap-2"
													>
														{order.order_id}
														{copyOrderId ? (
															<Check className="h-5 w-5 text-green-500" />
														) : (
															<Copy className="niceBtn h-5 w-5 text-white" />
														)}
													</span>
												</TooltipTrigger>
												<TooltipContent
													side="bottom"
													align="end"
													sideOffset={10}
													className="dark:border-2 dark:border-black dark:bg-slate-700 dark:text-white"
												>
													<p>Copy Order ID</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</>
								) : (
									<span className="animate-pulse">Loading...</span>
								)}
								<span className="sr-only">Copy Order ID</span>
							</div>
						</CardTitle>
						<CardDescription>Date: {date}</CardDescription>
					</div>
					<div className="!mt-0 ml-auto flex items-center gap-1">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button size="icon" variant="outline" className="h-8 w-8">
									<MoreVertical className="h-3.5 w-3.5" />
									<span className="sr-only">More</span>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem>Track Order</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => handleExport(true)}>
									Export as CSV
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleExport(false)}>
									Export as JSON
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</CardHeader>
				<CardContent className="p-6 text-sm">
					<div className="grid gap-3">
						<div className="font-semibold">Order Details</div>
						<ul className="grid gap-3">
							{order?.items.map((item, index) => (
								<li key={index} className="flex items-center justify-between">
									<span className="text-muted-foreground">
										{item.product.name} x <span>{item.quantity}</span>
									</span>
									<span>{formatPrice(item.product.default_price.unit_amount * item.quantity)}</span>
								</li>
							))}
						</ul>
						<Separator className="my-2" />
						<ul className="grid gap-3">
							<li className="flex items-center justify-between">
								<span className="text-muted-foreground">Subtotal</span>
								<span>
									{order?.items.map((item) => {
										const price = item.product.default_price.unit_amount * item.quantity;
										return price;
									})}
								</span>
							</li>
							<li className="flex items-center justify-between">
								<span className="text-muted-foreground">Shipping</span>
								<span>$5.00</span>
							</li>
							<li className="flex items-center justify-between">
								<span className="text-muted-foreground">Tax</span>
								<span>$25.00</span>
							</li>
							<li className="flex items-center justify-between font-semibold">
								<span className="text-muted-foreground">Total</span>
								<span>$329.00</span>
							</li>
						</ul>
					</div>
					<Separator className="my-4" />
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-3">
							<div className="font-semibold">Shipping Information</div>
							<address className="grid gap-0.5 not-italic text-muted-foreground">
								<span>Liam Johnson</span>
								<span>1234 Main St.</span>
								<span>Anytown, CA 12345</span>
							</address>
						</div>
						<div className="grid auto-rows-max gap-3">
							<div className="font-semibold">Billing Information</div>
							<div className="text-muted-foreground">Same as shipping address</div>
						</div>
					</div>
					<Separator className="my-4" />
					<div className="grid gap-3">
						<div className="font-semibold">Customer Information</div>
						<dl className="grid gap-3">
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Customer</dt>
								<dd>Liam Johnson</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Email</dt>
								<dd>
									<a href="mailto:">liam@acme.com</a>
								</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Phone</dt>
								<dd>
									<a href="tel:">+1 234 567 890</a>
								</dd>
							</div>
						</dl>
					</div>
					<Separator className="my-4" />
					<div className="grid gap-3">
						<div className="font-semibold">Payment Information</div>
						<dl className="grid gap-3">
							<div className="flex items-center justify-between">
								<dt className="flex items-center gap-1 text-muted-foreground">
									<CreditCard className="h-4 w-4" />
									Visa
								</dt>
								<dd>**** **** **** 4532</dd>
							</div>
						</dl>
					</div>
				</CardContent>
				<CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
					<div className="text-xs text-muted-foreground">
						Updated <time dateTime="2023-11-23">November 23, 2023</time>
					</div>
					<Pagination className="ml-auto mr-0 w-auto">
						<PaginationContent>
							<PaginationItem>
								<Button size="icon" variant="outline" className="h-6 w-6">
									<ChevronLeft className="h-3.5 w-3.5" />
									<span className="sr-only">Previous Order</span>
								</Button>
							</PaginationItem>
							<PaginationItem>
								<Button size="icon" variant="outline" className="h-6 w-6">
									<ChevronRight className="h-3.5 w-3.5" />
									<span className="sr-only">Next Order</span>
								</Button>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</CardFooter>
			</Card>
		</div>
	);
}
