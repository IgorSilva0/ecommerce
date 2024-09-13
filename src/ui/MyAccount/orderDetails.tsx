import { ChevronLeft, ChevronRight, Copy, MoreVertical, Check } from "lucide-react";
import { SiGooglepay, SiVisa } from "react-icons/si";
import React, { useEffect, useState } from "react";
import { type OrdersDataResponse, type Order } from "../../app/myaccount/utils/types";
import {
	exportOrderDetailsToCSV,
	exportToJSON,
	isSameAddress,
	type OrderExportData,
} from "./orders";
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

	return order ? (
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
						<CardDescription>Created: {date}</CardDescription>
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
										{item.product.name} x {item.quantity} {item.product.metadata.variant ?? null}
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
									{order
										? formatPrice(
												order.items.reduce((total, item) => {
													const price = item.product.default_price.unit_amount * item.quantity;
													return total + price;
												}, 0),
											)
										: null}
								</span>
							</li>
							<li className="flex items-center justify-between">
								<span className="text-muted-foreground">Shipping</span>
								<span>
									{order?.shipping_rate.map((item) =>
										item ? formatPrice(item.fixed_amount.amount) : "Free",
									)}
								</span>
							</li>
							<li className="flex items-center justify-between">
								<span className="text-muted-foreground">Tax</span>
								<span>
									{order?.tax.map((item) => (item ? formatPrice(item.taxAmount) : "N/A"))}
								</span>
							</li>
							<li className="flex items-center justify-between font-semibold">
								<span className="text-muted-foreground">Total</span>
								<span>
									{order
										? `£ ${order.total_price.toLocaleString("gbp-GB", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}`
										: null}
								</span>
							</li>
						</ul>
					</div>
					<Separator className="my-4" />
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-3">
							<div className="font-semibold">Shipping Information</div>
							<address className="grid gap-0.5 not-italic text-muted-foreground">
								<span>{order?.shipping_details[0]!.name}</span>
								<span>{order?.shipping_details[0]!.address.line1}</span>
								<span>
									{order
										? `
										${order.shipping_details[0]!.address.city}, 
										${order?.shipping_details[0]!.address.country} - 
										${order?.shipping_details[0]!.address.postal_code}`
										: null}
								</span>
							</address>
						</div>
						<div className="grid auto-rows-max gap-3">
							<div className="font-semibold">Billing Information</div>
							{order &&
							isSameAddress(
								order.shipping_details[0]?.address,
								order?.payment_method_details[0]?.billing_details.address,
							) ? (
								<div className="text-muted-foreground">Same as shipping</div>
							) : (
								<address className="grid gap-0.5 not-italic text-muted-foreground">
									<span>{order?.payment_method_details[0]?.billing_details.name}</span>
									<span>{order?.payment_method_details[0]?.billing_details.address.line1}</span>
									<span>
										{order
											? `
											${order.payment_method_details[0]?.billing_details.address.city}, 
											${order?.payment_method_details[0]?.billing_details.address.country} - 
											${order?.payment_method_details[0]?.billing_details.address.postal_code}`
											: null}
									</span>
								</address>
							)}
						</div>
					</div>
					<Separator className="my-4" />
					<div className="grid gap-3">
						<div className="font-semibold">Contact Information</div>
						<dl className="grid gap-3">
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Name</dt>
								<dd>{order ? order.payment_method_details[0]?.billing_details.name : null}</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Email</dt>
								<dd>{order ? order.payment_method_details[0]?.billing_details.email : null}</dd>
							</div>
							<div className="flex items-center justify-between">
								<dt className="text-muted-foreground">Phone</dt>
								<dd>
									{order?.payment_method_details[0]?.billing_details.phone ?? (
										<span className="text-muted-foreground">Not provided</span>
									)}
								</dd>
							</div>
						</dl>
					</div>
					<Separator className="my-4" />
					<div className="grid gap-3">
						<div className="font-semibold">Payment Information</div>
						<dl className="grid gap-3">
							<div className="flex items-center justify-between">
								{order ? (
									<>
										<dt className="flex items-center gap-1 text-muted-foreground">
											{order?.payment_method_details[0]?.card.wallet !== null &&
											order?.payment_method_details[0]?.card.wallet.type === "google_pay" ? (
												<SiGooglepay className="h-8 w-8" />
											) : null}
											{order?.payment_method_details[0]?.card.brand === "mastercard" ? (
												<div className="relative ml-1 flex items-start">
													<span className="h-4 w-4 rounded-full bg-rose-600"></span>
													<span className="h-4 w-4 -translate-x-1 rounded-full bg-orange-400"></span>
												</div>
											) : (
												<SiVisa className="h-8 w-8 text-blue-600" />
											)}
										</dt>
										<dd>**** **** **** {order?.payment_method_details[0]?.card.last4}</dd>
									</>
								) : null}
							</div>
						</dl>
					</div>
				</CardContent>
				<CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
					<div className="text-xs text-muted-foreground">
						Updated : <time>{date}</time>
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
	) : null;
}
