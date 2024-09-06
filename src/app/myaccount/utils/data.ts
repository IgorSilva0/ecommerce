"use server";

import { type OrdersDataResponse } from "./types";
import { createClient } from "@/utils/supabase/server";

export async function OrdersData(): Promise<OrdersDataResponse> {
	try {
		const supabase = createClient();
		// Fetch all orders data from the user_purchases table
		const { data, error } = await supabase.from("user_purchases").select("*");

		if (error) {
			console.error("An error occurred while fetching orders data:", error);
			return [];
		}

		// Cast data to OrdersDataResponse type
		return data as OrdersDataResponse;
	} catch (error) {
		console.error("An unexpected error occurred while fetching orders data:", error);
		return [];
	}
}
