"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export const SignInServer = async (formData: FormData, cart: boolean) => {
	try {
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const supabase = createClient();

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return true;
		}
		if (cart) {
			return;
		}
	} catch (err) {
		console.error("Error during sign-in:", err);
		return;
	}
	return redirect("/"); // success on SIGN-IN.
};
