"use server";

import { type Metadata } from "next/types";
import { getTranslations } from "next-intl/server";
import { AuthView } from "./AuthView";
import { userConnected } from "@/utils/supabase/userConnected";
import { Nav } from "@/ui/nav/Nav";
import { publicUrl } from "@/env.mjs";

export const generateMetadata = async (): Promise<Metadata> => {
	const t = await getTranslations("/login.metadata");

	return {
		title: t("title"),
		alternates: { canonical: `${publicUrl}/}` },
	};
};

export default async function Login() {
	const user: object | null = await userConnected();
	return (
		<div className="flex flex-col">
			<Nav />
			<AuthView user={user} />
		</div>
	);
}
