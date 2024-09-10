import { getTranslations } from "next-intl/server";
import { YnsLink } from "@/ui/YnsLink";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/ui/shadcn/breadcrumb";

export async function CartEmpty() {
	const t = await getTranslations("/cart.empty");
	return (
		<>
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
						<BreadcrumbLink
							asChild
							className="inline-flex min-h-12 min-w-12 items-center justify-center"
						>
							<YnsLink href="/products">{t("allProducts")}</YnsLink>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{t("checkoutTitle")}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className="py-auto my-auto flex h-[55dvh] flex-col items-center justify-center gap-4 md:h-[65dvh]">
				<div className="flex flex-col items-center justify-center space-y-2 text-center">
					<ShoppingCartIcon className="h-12 w-12" />
					<h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
					<p className="text-neutral-700 dark:text-neutral-400">{t("description")}</p>
				</div>
				<YnsLink
					className="bg-primary-500 mt-3 w-fit rounded-lg border-2 border-black bg-black px-10 py-2 text-base font-semibold text-white transition-all hover:bg-transparent hover:text-black dark:border-white dark:bg-transparent dark:hover:bg-white dark:hover:text-black"
					href="/"
				>
					{t("continueShoppingButton")}
				</YnsLink>
			</div>
		</>
	);
}

function ShoppingCartIcon(props: { className: string }) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="8" cy="21" r="1" />
			<circle cx="19" cy="21" r="1" />
			<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
		</svg>
	);
}
