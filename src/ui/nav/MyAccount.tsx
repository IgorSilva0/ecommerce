"use client";

import * as React from "react";

// TODO https://github.com/radix-ui/primitives/issues/2769

import {
	useState,
	useEffect,
	type ComponentPropsWithRef,
	type KeyboardEvent,
	type PointerEvent,
} from "react";
import { cn } from "@/lib/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/ui/shadcn/navigation-menu";
import { YnsLink } from "@/ui/YnsLink";
import { Separator } from "@/ui/separator/Separator";
import { userConnected } from "@/utils/supabase/userConnected";

export function MyAccount() {
	const [value, setValue] = useState<string | undefined>(undefined);
	const [connect, setConnected] = useState(false);

	useEffect(() => {
		const userON = async () => {
			try {
				const a = await userConnected();
				if (a) {
					setConnected(true);
				}
			} catch (error) {
				console.error("Failed to check user connection status:", error);
			}
		};
		void userON();
	}, []);

	return (
		<NavigationMenu value={value} onValueChange={setValue}>
			<NavigationMenuList>
				<NavigationMenuItem value="shop">
					<NavigationMenuTriggerWithFixedUX
						onKeyboardOpen={() => setValue((value) => (value === "shop" ? undefined : "shop"))}
					>
						My Account
					</NavigationMenuTriggerWithFixedUX>
					<NavigationMenuContent>
						{connect ? (
							<ul className="grid gap-3 p-4 md:w-[100px] lg:w-[200px]">
								<ListItem href="/products" title="All Purchase History">
									Track every order.
								</ListItem>
								<ListItem href="/category/apparel" title="Manage your account">
									Settings
								</ListItem>
								<ListItem href="/category/accessories" title="FAQs and support">
									Help
								</ListItem>
								<a
									href="/"
									className="mx-2 cursor-pointer rounded-md border-2 border-black bg-black py-2 text-center text-sm font-semibold text-white transition-all hover:bg-transparent hover:text-black"
								>
									LogOut
								</a>
							</ul>
						) : (
							<ul className="grid p-4 md:w-[100px] lg:w-[200px]">
								<a
									href="/login?t=Signin"
									className="mx-2 cursor-pointer rounded-md border-2 border-black bg-black py-2 text-center text-sm font-semibold text-white transition-all hover:bg-transparent hover:text-black"
								>
									Sign in
								</a>
								<Separator text={"or"} />
								<a
									href="/login?t=Signup"
									className="mx-2 cursor-pointer rounded-md border-2 border-black bg-black py-2 text-center text-sm font-semibold text-white transition-all hover:bg-transparent hover:text-black"
								>
									Register
								</a>
							</ul>
						)}
					</NavigationMenuContent>
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
