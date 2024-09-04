import { Suspense } from "react";
import { ShoppingCart } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { calculateCartTotalNetWithoutShipping } from "commerce-kit";
import { getCartFromCookiesAction } from "@/actions/cartActions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/ui/shadcn/tooltip";
import { YnsLink } from "@/ui/YnsLink";
import { formatMoney } from "@/lib/utils";

const CartFallback = async () => {
	const t = await getTranslations("Global.nav.cartSummary");
	return (
		<div className="opacity-90">
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger asChild>
						<ShoppingCart className="h-5 w-5 cursor-help" />
					</TooltipTrigger>
					<TooltipContent
						side="bottom"
						sideOffset={20}
						className="dark:border-2 dark:border-black dark:bg-slate-700 dark:text-white"
					>
						<p>{t("empty")}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</div>
	);
};

export const CartSummaryNav = () => {
	return (
		<Suspense fallback={<CartFallback />}>
			<CartSummaryNavInner />
		</Suspense>
	);
};

const CartSummaryNavInner = async () => {
	const cart = await getCartFromCookiesAction();
	if (!cart) {
		return <CartFallback />;
	}
	if (!cart.lines.length) {
		return <CartFallback />;
	}

	const total = calculateCartTotalNetWithoutShipping(cart);
	const totalItems = cart.lines.reduce((acc, line) => acc + line.quantity, 0);
	const t = await getTranslations("Global.nav.cartSummary");
	const locale = await getLocale();

	return (
		<TooltipProvider>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<div>
						<YnsLink
							href="/cart-overlay"
							scroll={false}
							className="relative mr-2.5 block"
							prefetch={true}
						>
							<ShoppingCart className="h-5 w-5" />
							<span className="absolute bottom-0 right-0 inline-flex h-5 w-5 translate-x-3/4 items-center justify-center rounded-full border-2 bg-white text-center text-xs dark:text-black">
								<span className="sr-only">{t("itemsInCart")}: </span>
								{totalItems}
							</span>
							<span className="sr-only">
								{t("total")}:{" "}
								{formatMoney({
									amount: total,
									currency: cart.cart.currency,
									locale,
								})}
							</span>
						</YnsLink>
					</div>
				</TooltipTrigger>
				<TooltipContent
					side="bottom"
					sideOffset={20}
					className="dark:border-2 dark:border-black dark:bg-slate-700 dark:text-white"
				>
					<p>{t("totalItems", { count: totalItems })}</p>
					<p>
						{t("total")}: {formatMoney({ amount: total, currency: cart.cart.currency, locale })}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
