"use server";

import { createClient } from "./server";

export const signOut = async () => {
	const supabase = createClient();
	try {
		await supabase.auth.signOut();
	} catch {
		throw new Error("Failed to logout");
	}
};
