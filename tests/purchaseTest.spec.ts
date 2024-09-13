import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
	await page.goto("https://ecommerce-rho-woad.vercel.app/");
	await page.locator("a").filter({ hasText: "Reviews" }).first().click();
	await page.getByRole("button", { name: "Add to cart" }).click();
	await page.getByRole("link", { name: "Go to payment" }).click();
	await page.goto("https://ecommerce-rho-woad.vercel.app/cart");
	await page.getByPlaceholder("email@example.com").click();
	await page.getByPlaceholder("email@example.com").fill("test@gmail.com");
	await page.getByPlaceholder("••••••••").click();
	await page.getByPlaceholder("••••••••").fill("123456");
	await page.getByRole("button", { name: "Sign In" }).click();

	const stripeFrame = page.frameLocator('iframe[src*="inner-address"]');

	await stripeFrame.getByPlaceholder("First and last name").fill("Igor Silva");
	await stripeFrame.getByPlaceholder("Street address").fill("7 Northfields");
	await stripeFrame.getByLabel("Town or city").fill("Knutsford");
	await stripeFrame.getByLabel("Postal code").fill("WA168JN");
	await stripeFrame.getByPlaceholder("123456").fill("07748 122933");

	await page.getByText("UPS1–3 business days£").click();

	const stripePaymentFrame = page.frameLocator('iframe[src*="inner-payment"]');

	await stripePaymentFrame.getByPlaceholder("1234 1234 1234").fill("4242 4242 4242 42422");
	await stripePaymentFrame.getByPlaceholder("MM / YY").fill("04 / 42");
	await stripePaymentFrame.getByPlaceholder("CVC").fill("424");

	expect(page.getByRole("button", { name: "Pay now" }).isVisible());
});
