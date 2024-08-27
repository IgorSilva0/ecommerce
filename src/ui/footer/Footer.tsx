import { getTranslations } from "next-intl/server";
import { Categories } from "@/ui/nav/Nav";
import { deslugify } from "@/lib/utils";
import { YnsLink } from "@/ui/YnsLink";
import { Newsletter } from "@/ui/footer/Newsletter.client";

export async function Footer() {
	const t = await getTranslations("Global.footer");
	return (
		<footer className="w-full bg-neutral-50 p-6 text-neutral-800 md:py-12">
			<div className="container flex max-w-7xl flex-row flex-wrap justify-center gap-16 text-sm sm:justify-between">
				<div className="flex w-full max-w-sm flex-col gap-2">
					<h3 className="font-semibold">{t("newsletterTitle")}</h3>
					<Newsletter />
				</div>
				<span className="self-center font-semibold">Handcrafted with passion by Igor ❣️</span>
				<nav className="grid grid-cols-2 gap-16">
					<section>
						<h3 className="mb-2 font-semibold">{t("categoriesTitle")}</h3>
						<ul role="list" className="grid gap-1">
							{Categories.map((category) => (
								<li key={category.slug}>
									<YnsLink
										className="underline-offset-4 hover:underline"
										href={`/category/${category.slug}`}
									>
										{deslugify(category.slug)}
									</YnsLink>
								</li>
							))}
						</ul>
					</section>
					<section>
						<h3 className="mb-2 font-semibold">Support</h3>
						<ul role="list" className="grid gap-1">
							<li>
								<YnsLink className="underline-offset-4 hover:underline" href="">
									Features
								</YnsLink>
							</li>
							<li>
								<YnsLink className="underline-offset-4 hover:underline" href="">
									Pricing
								</YnsLink>
							</li>
							<li>
								<YnsLink
									className="underline-offset-4 hover:underline"
									href="mailto:igorsilvauk@gmail.com"
								>
									Contact Us
								</YnsLink>
							</li>
						</ul>
					</section>
				</nav>
			</div>
		</footer>
	);
}
