"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

export const SignUpServer = async (formData: FormData, cart: boolean) => {
	try {
		const origin = headers().get("origin");
		const title = formData.get("honorificprefix") as string;
		const firstname = formData.get("firstname") as string;
		const lastname = formData.get("lastname") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;
		const supabase = createClient();

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});

		if (error) {
			console.error("An unexpected error occurred during sign-up:", error);
			return true;
		}

		const admin = createAdminClient();

		const { error: adminError } = await admin.from("users").insert([
			{
				user_id: data?.user!.id,
				title: title,
				first_name: firstname,
				last_name: lastname,
				email: email,
				role: "user",
			},
		]);
		if (adminError) {
			console.error("An unexpected error occurred during sign-up:", adminError);
		}
		if (cart) {
			return;
		}
	} catch (error) {
		console.error("An unexpected error occurred during sign-up:", error);
		return;
	}
	return redirect("/"); // success on SIGN-UP.
};
