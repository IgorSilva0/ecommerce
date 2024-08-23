"use server";

import { redirect } from "next/navigation";
import { AuthView } from "./AuthView";
import { userConnected } from "@/utils/supabase/userConnected";
import { Nav } from "@/ui/nav/Nav";

export default async function Login({
	searchParams,
}: {
	searchParams: {
		t?: "Signup" | "Signin";
	};
}) {
	const type = searchParams.t;
	const user = await userConnected();

	if (user || !type || !["Signin", "Signup"].includes(type)) {
		return redirect("/");
	}

	return (
		<div className="flex flex-col">
			<Nav />
			<AuthView type={type} />
		</div>
	);
}
