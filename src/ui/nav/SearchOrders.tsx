import { Suspense } from "react";
import { SearchIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SearchInputPlaceholder } from "@/ui/nav/SearchInput.client";

export const SearchOrders = async () => {
	const t = await getTranslations("Global.nav.searchOrders");
	return (
		<label className="flex w-full items-center">
			<span className="sr-only">{t("title")}</span>
			<Suspense fallback={<SearchInputPlaceholder placeholder={t("placeholder")} />}>
				<SearchInputPlaceholder placeholder={t("placeholder")} />
			</Suspense>
			<SearchIcon className="-ml-7 block h-5 w-5" />
		</label>
	);
};
