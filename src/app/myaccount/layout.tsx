import { redirect } from "next/navigation";
import { TooltipProvider } from "@/ui/shadcn/tooltip";
import { userConnected } from "@/utils/supabase/userConnected";
import { Nav } from "@/ui/nav/Nav";
import { SearchOrders } from "@/ui/nav/SearchOrders";
import { NavMenuOrders } from "@/ui/nav/NavMenuOrders";

export default async function MyAccountLayout({ children }: { children: React.ReactNode }) {
	const user = await userConnected();
	if (!user) {
		return redirect("/login");
	}

	return (
		<TooltipProvider>
			<Nav Menu={<NavMenuOrders />} Search={<SearchOrders />} />
			<main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
				{children}
			</main>
		</TooltipProvider>
	);
}
