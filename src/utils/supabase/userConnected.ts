"use server";

import { createClient } from "./server";

type User = {
	id: string;
	email: string;
	// Add other user properties if needed
};

export const userConnected = async (data?: string): Promise<User | null> => {
	const supabase = createClient();

	try {
		const { data: userData, error } = await supabase.auth.getUser();

		if (error) {
			//console.error("Error fetching user (Not Connected):", error); // logs if the user is trying to do something without auth
			return null; // Gracefully handle error
		}

		if (userData.user) {
			return userData.user as User; // Ensure `userData.user` matches the `User` type
		}

		return null; // No user connected
	} catch (error) {
		console.error("Error in userConnected function:", error);
		return null; // Gracefully handle error
	}
};
