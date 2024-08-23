"use server";

import { createClient } from "./server";

export const userConnected = async () => {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		return true;
	}
	return false;
};
