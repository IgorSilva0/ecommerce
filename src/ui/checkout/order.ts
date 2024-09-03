"use server";

import * as Commerce from "commerce-kit";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";

export async function orderToDB(searchPrms: string) {
	console.log(searchPrms);

	const order = await Commerce.orderGet(searchPrms);
	const supabase = createClient();
	const admin = createAdminClient();

	const { data: userData } = await supabase.auth.getUser();

	try {
		const { error: adminError } = await admin.from("user_purchases").insert([
			{
				user_id: userData.user!.id,
				order_id: order!.order.id,
				items: order!.lines,
				shipping_details: [order!.order.shipping],
				delivery_status: "Pending",
				parcel_tracking: "N/A",
				total_price: order!.order.amount,
				currency: order!.order.currency,
				payment_method_details: [order!.order.payment_method],
				shipping_rate: [order!.shippingRate],
				tax: order!.order.taxBreakdown,
			},
		]);

		if (adminError) {
			console.error("An unexpected error occurred during DB order creation:", adminError);
		}
	} catch (error) {
		console.error("An unexpected error occurred during DB order creation:", error);
		return;
	}
}
