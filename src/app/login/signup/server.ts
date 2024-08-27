"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const SignUpServer = async (formData: FormData, cart: boolean) => {
	try {
		const origin = headers().get("origin");
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const supabase = createClient();

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});

		if (error) {
			if (error.code === "weak_password") {
				return "Weak Passsword";
			}
			return "Could not authenticate user";
		}
		if (cart) {
			return;
		}
		return redirect("/"); // If success on SIGN-UP.
	} catch (error) {
		console.error("An unexpected error occurred during sign-up:", error);
		return false;
	}
};
