import { redirect } from "next/navigation";
import { TooltipProvider } from "@/ui/shadcn/tooltip";
import { YnsLink } from "@/ui/YnsLink";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/ui/shadcn/breadcrumb";
import { userConnected } from "@/utils/supabase/userConnected";
import { Nav } from "@/ui/nav/Nav";
import { SearchOrders } from "@/ui/nav/SearchOrders";

export default async function MyAccountLayout({ children }: { children: React.ReactNode }) {
	const user = await userConnected();
	if (!user) {
		return redirect("/login");
	}

	return (
		<TooltipProvider>
			<div>
				<Nav Menu={true} Search={<SearchOrders />} />
				<Breadcrumb className="mx-auto max-w-7xl px-8 pt-5">
					<BreadcrumbList>
						<BreadcrumbItem>
							<YnsLink href="/">Shop</YnsLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>Orders</BreadcrumbPage>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<YnsLink href="/myaccount/settings">Settings</YnsLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<YnsLink href="/myaccount/help">Help</YnsLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				{children}
			</div>
		</TooltipProvider>
	);
}
