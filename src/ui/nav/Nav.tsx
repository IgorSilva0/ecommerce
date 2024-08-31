import { MyAccount } from "./MyAccount";
import { CartSummaryNav } from "@/ui/nav/CartSummaryNav";
import { SeoH1 } from "@/ui/SeoH1";
import { SearchNav } from "@/ui/nav/SearchNav";
import { NavMenu } from "@/ui/nav/NavMenu";
import { YnsLink } from "@/ui/YnsLink";

export const Categories = [
	{ name: "Apparel", slug: "apparel" },
	{ name: "Accessories", slug: "accessories" },
];

export const Nav = () => {
	return (
		<>
			<header className="sticky -top-1 z-50 border-b bg-white pb-2 pt-4 shadow-epic md:pb-4">
				<div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-2 px-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-6 md:flex md:flex-nowrap lg:px-8">
					<YnsLink href="/">
						<SeoH1 className="-mt-0.5 whitespace-nowrap text-xl font-bold">Your New Store</SeoH1>
					</YnsLink>

					<div className="row-start-3 sm:mr-auto">
						<NavMenu />
					</div>

					<div className="row-start-2 flex w-full items-center justify-start gap-x-6 md:w-auto">
						<SearchNav />
						<div className="hidden md:block">
							<MyAccount />
						</div>
						<div className="hidden md:block">
							<CartSummaryNav />
						</div>
					</div>
				</div>
			</header>
		</>
	);
};
