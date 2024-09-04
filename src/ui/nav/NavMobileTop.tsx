import {
	Package2,
	PanelLeft,
	Settings,
	HeartHandshake,
	ScrollText,
	LogOut,
	Store,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/ui/shadcn/sheet";
import { Button } from "@/ui/shadcn/button";
import { Separator } from "@/ui/shadcn/separator";
import { YnsLink } from "@/ui/YnsLink";

export function NavMobileTop() {
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
							<SheetTitle className="-mt-0.5 flex gap-4 whitespace-nowrap px-2.5 text-xl font-bold">
								<Package2 />
								Your New Store
							</SheetTitle>
							<span className="sr-only">Shop</span>
						</YnsLink>
						<Separator className="bg-slate-300" />
						<YnsLink
							href="/"
							className="mt-3 flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<Store className="h-5 w-5" />
							Shop
						</YnsLink>
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
						<YnsLink
							href="/"
							className="mt-4 flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
						>
							<LogOut className="h-5 w-5" />
							Logout
						</YnsLink>
					</nav>
				</SheetContent>
			</Sheet>
		</>
	);
}
