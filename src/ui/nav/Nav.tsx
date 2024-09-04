import React from "react";
import { MyAccount } from "./MyAccount";
import { CartSummaryNav } from "@/ui/nav/CartSummaryNav";
import { YnsLink } from "@/ui/YnsLink";
import { NavMenu } from "@/ui/nav/NavMenu";
import { SearchNav } from "@/ui/nav/SearchNav";
import { NavMobileTop } from "@/ui/nav/NavMobileTop";
import { ThemeSwitch } from "@/ui/theme/ThemeSwitch";

export const Categories = [
	{ name: "Apparel", slug: "apparel" },
	{ name: "Accessories", slug: "accessories" },
];

interface NavProps {
	Menu?: React.ReactNode;
	Search?: React.ReactNode;
}

export const Nav: React.FC<NavProps> = ({ Menu, Search }) => {
	return (
		<>
			<header className="top-0 z-50 border-b bg-white pb-2 pt-4 shadow-epic dark:bg-slate-950 md:sticky md:pb-4">
				<div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-4 px-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-6 md:flex md:flex-nowrap lg:px-8">
					<YnsLink href="/">
						<h1 className="-mt-0.5 whitespace-nowrap pr-5 text-xl font-bold">Your New Store</h1>
					</YnsLink>

					<div className="row-start-3 sm:mr-auto">{Menu ?? <NavMenu />}</div>

					<div className="row-start-2 flex w-full items-center justify-start gap-x-6 md:w-auto">
						{Search ?? <SearchNav />}

						<div className="hidden md:block">
							<MyAccount />
						</div>
						<div className="hidden rounded-md border border-input bg-background p-[7px] shadow-sm hover:bg-accent hover:text-accent-foreground md:block">
							<CartSummaryNav />
						</div>
						<div className="absolute -top-1 right-[15px] flex items-center gap-6 md:relative md:right-0 md:top-0 md:gap-7">
							<ThemeSwitch />
							<NavMobileTop />
						</div>
					</div>
				</div>
			</header>
		</>
	);
};
