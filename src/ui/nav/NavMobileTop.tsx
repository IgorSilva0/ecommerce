"use client";
import { PanelLeft, Settings, HeartHandshake, ScrollText, LogOut, Store } from "lucide-react";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/ui/shadcn/sheet";
import { Button } from "@/ui/shadcn/button";
import { Separator } from "@/ui/shadcn/separator";
import { YnsLink } from "@/ui/YnsLink";
import { userConnected } from "@/utils/supabase/userConnected";
import { signOut } from "@/utils/supabase/signout";

export function NavMobileTop() {
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

	const signout = async () => {
		await signOut();
		setConnected(false);
	};

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
						<SheetClose asChild>
							<YnsLink href="/">
								<SheetTitle className="mx-2 -mt-0.5 flex gap-1 whitespace-nowrap text-xl font-bold">
									{/* <Package2 /> */}
									❣️ Your New Store ❣️
								</SheetTitle>
								<span className="sr-only">Shop</span>
							</YnsLink>
						</SheetClose>
						<Separator className="bg-slate-300" />
						<SheetClose asChild>
							<YnsLink
								href="/"
								className="mt-3 flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<Store className="h-5 w-5" />
								Shop
							</YnsLink>
						</SheetClose>
						<SheetClose asChild>
							<YnsLink
								href={connect ? "/myaccount" : "/login"}
								className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<ScrollText className="h-5 w-5" />
								Orders
							</YnsLink>
						</SheetClose>
						<SheetClose asChild>
							<YnsLink
								href={connect ? "/myaccount/settings" : "/login"}
								className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<Settings className="h-5 w-5" />
								Settings
							</YnsLink>
						</SheetClose>
						<SheetClose asChild>
							<YnsLink
								href="/help"
								className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
							>
								<HeartHandshake className="h-5 w-5" />
								Help
							</YnsLink>
						</SheetClose>
						<SheetClose asChild>
							{connect ? (
								<YnsLink
									href="/"
									onClick={() => signout()}
									className="mt-4 flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<LogOut className="h-5 w-5" />
									Logout
								</YnsLink>
							) : (
								<YnsLink
									href="/login"
									className="mt-4 flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
								>
									<LogOut className="h-5 w-5" />
									Login
								</YnsLink>
							)}
						</SheetClose>
					</nav>
				</SheetContent>
			</Sheet>
		</>
	);
}
