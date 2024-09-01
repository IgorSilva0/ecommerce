import { type Metadata } from "next/types";
import { getTranslations } from "next-intl/server";
import { getCartFromCookiesAction } from "@/actions/cartActions";
import { CheckoutCard } from "@/ui/checkout/CheckoutCard";
import { userConnected } from "@/utils/supabase/userConnected";
import { AuthView } from "@/app/login/AuthView";

export const generateMetadata = async (): Promise<Metadata> => {
	const t = await getTranslations("/cart.metadata");
	return {
		title: t("title"),
	};
};

export default async function CartPage() {
	const cart = await getCartFromCookiesAction();
	if (!cart) {
		return <div>No cart found.</div>; // Provide a user-friendly message or alternative UI
	}
	const user = await userConnected();
	const email = user?.email ?? "notloggedin@email.com";
	const info = "Please sign in before checking out";

	return user ? (
		<CheckoutCard cart={cart.cart} userEmail={email} />
	) : (
		<AuthView cart={true} info={info} />
	);
}
