import { type Metadata } from "next/types";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { TooltipProvider } from "@/ui/shadcn/tooltip";
import { userConnected } from "@/utils/supabase/userConnected";
import { publicUrl } from "@/env.mjs";
import { Nav } from "@/ui/nav/Nav";

export const generateMetadata = async (): Promise<Metadata> => {
	const t = await getTranslations("/myaccount.metadata");

	return {
		title: t("title"),
		alternates: { canonical: `${publicUrl}/}` },
	};
};

export default async function MyAccountLayout({ children }: { children: React.ReactNode }) {
	const user = await userConnected();
	if (!user) {
		return redirect("/login");
	}

	return (
		<TooltipProvider>
			<Nav />
			<main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
				{children}
			</main>
		</TooltipProvider>
	);
}
