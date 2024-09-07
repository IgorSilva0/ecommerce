"use client";

import * as React from "react";

// TODO https://github.com/radix-ui/primitives/issues/2769

import { useState, type ComponentPropsWithRef, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/ui/shadcn/navigation-menu";
import { YnsLink } from "@/ui/YnsLink";

const links = [
	{
		title: "Our Story",
		href: "/ourstory",
		description: "Learn about our company and our mission.",
	},
	{
		title: "Our Policies",
		href: "/policies",
		description: "Read our terms and conditions, privacy policy, and more.",
	},
	{
		title: "Quality Guarantee",
		href: "/quality",
		description: "We guarantee the quality of our products.",
	},
];

export function NavMenu() {
	const [value, setValue] = useState<string | undefined>(undefined);
	return (
		<NavigationMenu value={value} onValueChange={setValue}>
			<NavigationMenuList>
				<NavigationMenuItem value="shop">
					<NavigationMenuTriggerWithFixedUX
						onKeyboardOpen={() => setValue((value) => (value === "shop" ? undefined : "shop"))}
					>
						Shop
					</NavigationMenuTriggerWithFixedUX>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<ListItem href="/products" title="All products">
								All products in our store are listed here.
							</ListItem>
							<ListItem href="/category/fashion" title="Tech Fashion">
								Show off your coding passion with our jackets, tees, and hats.
							</ListItem>
							<ListItem href="/category/sports" title="Sports & Fitness">
								Gear up for every activity, from gym workouts to biking.
							</ListItem>
							<ListItem href="/category/electronics	" title="Electronics">
								Discover the latest in gadgets, gear, and tech essentials.
							</ListItem>
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem value="about">
					<NavigationMenuTriggerWithFixedUX
						onKeyboardOpen={() => setValue((value) => (value === "about" ? undefined : "about"))}
					>
						About
					</NavigationMenuTriggerWithFixedUX>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px] xl:w-[600px]">
							{links.map((link) => (
								<ListItem key={link.title} title={link.title} href={link.href}>
									{link.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem value="documentation">
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<YnsLink href="/help">Help</YnsLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = ({
	className,
	title,
	children,
	href,
	ref,
	...props
}: ComponentPropsWithRef<"a">) => {
	return (
		<li>
			<NavigationMenuLink asChild>
				<YnsLink
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
					href={href ?? "#"}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
				</YnsLink>
			</NavigationMenuLink>
		</li>
	);
};

const NavigationMenuTriggerWithFixedUX = ({
	onKeyboardOpen,
	...props
}: React.ComponentProps<typeof NavigationMenuTrigger> & {
	onKeyboardOpen?: (e: KeyboardEvent | PointerEvent) => void;
}) => {
	return (
		<NavigationMenuTrigger
			{...props}
			onClick={(e) => {
				// the menu should open on click on touch screens
				// in some browsers onClick can be triggered by PointerEvent
				if (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType !== "mouse") {
					return;
				}
				// prevent the default behavior for mouse users
				e.preventDefault();
			}}
			// the menu should open on click on touch screens
			onPointerDown={(e) => onKeyboardOpen?.(e)}
			onKeyDown={(e) => {
				// reimplement the default behavior for keyboard users
				if (e.key === "Enter" || e.key === " ") {
					return onKeyboardOpen?.(e);
				}
			}}
		/>
	);
};
