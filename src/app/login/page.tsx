"use server";

import { redirect } from "next/navigation";
import { AuthView } from "./AuthView";
import { userConnected } from "@/utils/supabase/userConnected";
import { Nav } from "@/ui/nav/Nav";

export default async function Login() {
	const user = await userConnected();

	if (user) {
		return redirect("/");
	}

	return (
		<div className="flex flex-col">
			<Nav />
			<AuthView />
		</div>
	);
}
