import { test } from "@playwright/test";

test("test", async ({ page }) => {
	await page.goto("https://ecommerce-rho-woad.vercel.app/");
	await page.getByRole("link", { name: "View All Products" }).click();
});
