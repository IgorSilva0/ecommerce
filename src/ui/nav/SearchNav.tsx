import { Suspense } from "react";
import { SearchIcon, Sparkle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SearchInput, SearchInputPlaceholder } from "@/ui/nav/SearchInput.client";

export const SearchNav = async () => {
	const t = await getTranslations("Global.nav.search");
	return (
		<label className="niceBtn relative flex w-full items-center p-0.5">
			<span className="sr-only">{t("title")}</span>
			<Suspense fallback={<SearchInputPlaceholder placeholder={t("placeholder")} />}>
				<SearchInput placeholder={t("placeholder")} />
			</Suspense>
			<Sparkle className="rainBowOne absolute right-2 top-2 block h-2 w-2 fill-yellow-300 text-purple-600 dark:text-yellow-300" />
			<Sparkle className="rainBowTwo absolute right-6 top-2 block h-2 w-2 fill-yellow-300 text-green-500 dark:text-yellow-300" />
			<Sparkle className="rainBowThree absolute bottom-1.5 right-6 block h-2 w-2 fill-yellow-300 text-red-500 dark:text-yellow-300" />
			<SearchIcon className="-ml-7 block h-5 w-5" />
		</label>
	);
};
