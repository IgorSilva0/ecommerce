import { getTranslations } from "next-intl/server";
import * as Commerce from "commerce-kit";
import apple_pay from "@/images/payments/apple_pay.svg";
import google_pay from "@/images/payments/google_pay.svg";
import mastercard from "@/images/payments/mastercard.svg";
import visa from "@/images/payments/visa.svg";
import { StripePayment } from "@/ui/checkout/stripePayment";

export const paymentMethods = {
	apple_pay,
	google_pay,
	mastercard,
	visa,
};

export const CheckoutCard = async ({
	cart,
	userEmail,
}: {
	cart: Commerce.Cart["cart"];
	userEmail: string;
}) => {
	const shippingRates = await Commerce.shippingBrowse();
	const t = await getTranslations("/cart.page");
	return (
		<section className="max-w-md pb-12">
			<h2 className="mb-4 text-3xl font-bold leading-none tracking-tight">{t("checkoutTitle")}</h2>

			<div className="rounded-lg bg-white p-5 shadow-epic dark:bg-slate-950">
				<StripePayment
					shippingRateId={cart.metadata.shippingRateId}
					shippingRates={structuredClone(shippingRates.data)}
					userEmail={userEmail}
				/>
			</div>
		</section>
	);
};
