import { Package2, PanelLeft, Settings, HeartHandshake, ScrollText } from "lucide-react";
import React from "react";
import { MyAccount } from "./MyAccount";
import { Sheet, SheetContent, SheetTrigger } from "@/ui/shadcn/sheet";
import { Button } from "@/ui/shadcn/button";
import { Separator } from "@/ui/shadcn/separator";
import { CartSummaryNav } from "@/ui/nav/CartSummaryNav";
import { YnsLink } from "@/ui/YnsLink";
import { Switch } from "@/ui/shadcn/switch";
import { NavMenu } from "@/ui/nav/NavMenu";
import { SearchNav } from "@/ui/nav/SearchNav";

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
			<header className="top-0 z-50 border-b bg-white pb-2 pt-4 shadow-epic dark:bg-slate-900 md:sticky md:pb-4">
				<div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-4 px-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-6 md:flex md:flex-nowrap lg:px-8">
					<YnsLink href="/">
						<h1 className="-mt-0.5 whitespace-nowrap pr-5 text-xl font-bold">Your New Store</h1>
					</YnsLink>

					<div className="row-start-3 sm:mr-auto">{Menu ?? <NavMenu />}</div>

					<div className="row-start-2 flex w-full items-center justify-start gap-x-6 md:w-auto">
						{Search ?? <SearchNav />}
						<div className="absolute -top-1 right-[15px] flex items-center gap-6 md:relative md:right-0 md:top-0 md:gap-7">
							<Switch className="relative w-12" />
							<NavMobileTop />
						</div>
						<div className="hidden md:block">
							<MyAccount />
						</div>
						<div className="hidden pl-1.5 md:block">
							<CartSummaryNav />
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

function NavMobileTop() {
	return (
		<>
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline" className="md:hidden">
						<PanelLeft className="h-6 w-6" />
						<span className="sr-only">Toggle Menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="right" className="sm:max-w-xs">
					<nav className="grid gap-6 text-lg font-medium">
						<YnsLink href="/">
							<h1 className="-mt-0.5 flex gap-4 whitespace-nowrap pr-5 text-xl font-bold">
								<Package2 />
								Your New Store
							</h1>
							<span className="sr-only">Shop</span>
						</YnsLink>
						<Separator className="bg-slate-300" />
						<YnsLink
							href="/myaccount"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<ScrollText className="h-5 w-5" />
							Orders
						</YnsLink>
						<YnsLink
							href="#"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<Settings className="h-5 w-5" />
							Settings
						</YnsLink>
						<YnsLink
							href="#"
							className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<HeartHandshake className="h-5 w-5" />
							Help
						</YnsLink>
					</nav>
				</SheetContent>
			</Sheet>
		</>
	);
}
