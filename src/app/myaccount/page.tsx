import { AuthView } from "@/app/login/AuthView";
import { Nav } from "@/ui/nav/Nav";
import { userConnected } from "@/utils/supabase/userConnected";

export default async function MyAccount() {
	const user = await userConnected();
	const info = "Please sign in or sign up to access your account.";
	return user ? (
		<div>
			<Nav />
			<h1>My Account</h1>
		</div>
	) : (
		<>
			<Nav />
			<AuthView cart={true} info={info} />
		</>
	);
}
