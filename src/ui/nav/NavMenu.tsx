"use client";

import * as React from "react";

// TODO https://github.com/radix-ui/primitives/issues/2769

import { useState } from "react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "@/ui/shadcn/navigation-menu";
import { YnsLink } from "@/ui/YnsLink";

// const links = [
// 	{
// 		title: "About us",
// 		href: "/ourstory",
// 		description: "Learn about our company and our mission.",
// 	},
// 	{
// 		title: "Store Policies",
// 		href: "/policies",
// 		description: "Read our terms and conditions, privacy policy, and more.",
// 	},
// 	{
// 		title: "Quality Guarantee",
// 		href: "/quality",
// 		description: "We guarantee the quality of our products.",
// 	},
// ];

export function NavMenu() {
	const [value, setValue] = useState<string | undefined>(undefined);
	return (
		<NavigationMenu value={value} onValueChange={setValue}>
			<NavigationMenuList>
				<NavigationMenuItem value="fashion">
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<YnsLink href="/category/fashion">Fashion</YnsLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem value="Sports">
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<YnsLink href="/category/sports">Sports</YnsLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
				<NavigationMenuItem value="Sports">
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<YnsLink href="/category/electronics">Electronics</YnsLink>
					</NavigationMenuLink>
				</NavigationMenuItem>
				{/* <NavigationMenuItem value="about">
					<NavigationMenuTriggerWithFixedUX
						onKeyboardOpen={() => setValue((value) => (value === "about" ? undefined : "about"))}
					>
						About
					</NavigationMenuTriggerWithFixedUX>
					<NavigationMenuContent>
						<ul className="grid gap-3 p-4 w-[180px] sm:w-[250px] md:w-[300px] lg:w-[400px] md:grid-cols-1">
							{links.map((link) => (
								<ListItem key={link.title} title={link.title} href={link.href}>
									<span className="hidden sm:block">{link.description}</span>
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
				<NavigationMenuItem value="help">
					<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
						<YnsLink href="/help">Help</YnsLink>
					</NavigationMenuLink>
				</NavigationMenuItem> */}
			</NavigationMenuList>
		</NavigationMenu>
	);
}

// const ListItem = ({
// 	className,
// 	title,
// 	children,
// 	href,
// 	ref,
// 	...props
// }: ComponentPropsWithRef<"a">) => {
// 	return (
// 		<li>
// 			<NavigationMenuLink asChild>
// 				<YnsLink
// 					ref={ref}
// 					className={cn(
// 						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
// 						className,
// 					)}
// 					{...props}
// 					href={href ?? "#"}
// 				>
// 					<div className="text-sm font-medium leading-none">{title}</div>
// 					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
// 				</YnsLink>
// 			</NavigationMenuLink>
// 		</li>
// 	);
// };

// const NavigationMenuTriggerWithFixedUX = ({
// 	onKeyboardOpen,
// 	...props
// }: React.ComponentProps<typeof NavigationMenuTrigger> & {
// 	onKeyboardOpen?: (e: KeyboardEvent | PointerEvent) => void;
// }) => {
// 	return (
// 		<NavigationMenuTrigger
// 			{...props}
// 			onClick={(e) => {
// 				// the menu should open on click on touch screens
// 				// in some browsers onClick can be triggered by PointerEvent
// 				if (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType !== "mouse") {
// 					return;
// 				}
// 				// prevent the default behavior for mouse users
// 				e.preventDefault();
// 			}}
// 			// the menu should open on click on touch screens
// 			onPointerDown={(e) => onKeyboardOpen?.(e)}
// 			onKeyDown={(e) => {
// 				// reimplement the default behavior for keyboard users
// 				if (e.key === "Enter" || e.key === " ") {
// 					return onKeyboardOpen?.(e);
// 				}
// 			}}
// 		/>
// 	);
// };
