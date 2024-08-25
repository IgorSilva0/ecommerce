"use client";

import * as React from "react";
import {
	useState,
	useEffect,
	type ComponentPropsWithRef,
	type KeyboardEvent,
	type PointerEvent,
} from "react";
import { cn } from "@/lib/utils";
import { signOut } from "@/utils/supabase/signout";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/ui/shadcn/navigation-menu";
import { YnsLink } from "@/ui/YnsLink";
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
	}, [value]);

	const signout = async () => {
		await signOut();
		setConnected(false);
	};

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
								<ListItem href="/orders" title="All Purchase History">
									Track every order.
								</ListItem>
								<ListItem href="/settings" title="Manage your account">
									Settings
								</ListItem>
								<ListItem href="/help" title="FAQs and support">
									Help
								</ListItem>
								<button
									onClick={() => signout()}
									className="mx-2 cursor-pointer rounded-md border-2 border-black bg-black py-2 text-center text-sm font-semibold text-white transition-all hover:bg-transparent hover:text-black"
								>
									LogOut
								</button>
							</ul>
						) : (
							<ul className="grid p-4 md:w-[90px] lg:w-[180px]">
								<a
									href="/login"
									className="mx-2 cursor-pointer rounded-md border-2 border-black bg-black py-2 text-center text-sm font-semibold text-white transition-all hover:bg-transparent hover:text-black"
								>
									Sign in
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
