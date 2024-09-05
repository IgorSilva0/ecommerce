import "@/app/globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Toaster } from "@/ui/shadcn/sonner";
import { publicUrl } from "@/env.mjs";
import { Footer } from "@/ui/footer/Footer";
import { NavMobile } from "@/ui/nav/NavMobile";
import { Theme } from "@/ui/theme/Theme";

export const generateMetadata = async (): Promise<Metadata> => {
	const t = await getTranslations("Global.metadata");
	return {
		title: t("title"),
		description: t("description"),
		metadataBase: new URL(publicUrl),
	};
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	const locale = await getLocale();
	const messages = await getMessages();
	return (
		<html lang={locale} className="h-full antialiased">
			<body className="flex min-h-full flex-col bg-white dark:bg-slate-950">
				<Theme attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<NextIntlClientProvider messages={messages}>
						<div
							className="flex min-h-full flex-col bg-neutral-50 dark:bg-slate-900"
							vaul-drawer-wrapper=""
						>
							{children}
							<Footer />
						</div>

						<Toaster position="top-center" offset={10} />
						<NavMobile />
					</NextIntlClientProvider>
				</Theme>
				<SpeedInsights />
				<Analytics />
			</body>
		</html>
	);
}
