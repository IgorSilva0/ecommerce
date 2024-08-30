"use server";

import { AuthView } from "./AuthView";
import { userConnected } from "@/utils/supabase/userConnected";
import { Nav } from "@/ui/nav/Nav";

export default async function Login() {
	const user: object | null = await userConnected();
	return (
		<div className="flex flex-col">
			<Nav />
			<AuthView user={user} />
		</div>
	);
}
