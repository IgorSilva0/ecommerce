"use client";

import * as React from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/ui/shadcn/navigation-menu";
import { YnsLink } from "@/ui/YnsLink";

export function NavMenuOrders() {
	return (
		<NavigationMenu className="hidden md:block">
			<NavigationMenuList>
				<NavigationMenuItem value="shop">
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<YnsLink href="/">Shop</YnsLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem value="orders">
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<YnsLink href="/myaccount">Orders</YnsLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem value="Settings">
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<YnsLink href="/myaccount/settings">Settings</YnsLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem value="Help">
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<YnsLink href="/help">Help</YnsLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
