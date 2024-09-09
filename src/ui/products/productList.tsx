import Image from "next/image";
import { Star } from "lucide-react";
import { getLocale } from "next-intl/server";
import type * as Commerce from "commerce-kit";
import { JsonLd, mappedProductsToJsonLd } from "@/ui/JsonLd";
import { YnsLink } from "@/ui/YnsLink";
import { formatMoney } from "@/lib/utils";

export const ProductList = async ({ products }: { products: Commerce.MappedProduct[] }) => {
	const locale = await getLocale();

	//// Just for fun ////
	const salesTxt = [
		"Only 5 Left!",
		"Limited Stock!",
		"Last Chance!",
		"Almost Gone!",
		"Final Sale!",
		"Selling Fast!",
		"Limited Time!",
		"Few Left!",
		"Act Now!",
		"Best Seller!",
		"Popular Item!",
		"Top Rated!",
		"Best Value!",
		"Great Deal!",
		"Hot Item!",
		"New Arrival!",
		"Best Quality!",
		"Top Pick!",
		"Staff Pick!",
		"Highly Rated!",
		"High Demand!",
		"Best Price!",
		"Great Price!",
		"Best Deal!",
	];

	//// Just for fun ////
	const stars = () => {
		const minRating = 3;
		const maxRating = 5;
		const rating = Math.floor(Math.random() * (maxRating - minRating + 1)) + minRating;

		return (
			<>
				{Array.from({ length: rating }, (_, idx) => (
					<Star key={`filled-${idx}`} className="h-4 w-4 fill-yellow-500" />
				))}
				{Array.from({ length: maxRating - rating }, (_, idx) => (
					<Star key={`empty-${idx}`} className="h-4 w-4 fill-gray-300" />
				))}
			</>
		);
	};

	//// Just for fun ////
	const randomReview = () => Math.ceil(Math.random() * 100);

	return (
		<>
			<ul className="mt-5 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((product, idx) => {
					return (
						<li key={product.id} className="group">
							<YnsLink href={`/product/${product.metadata.slug}`}>
								<article className="overflow-hidden rounded-xl border-2 border-gray-300 bg-white shadow transition-all hover:border-gray-400 hover:bg-gray-300/50 dark:border-gray-700 dark:bg-slate-800/50 dark:hover:border-gray-500 dark:hover:bg-slate-700">
									<header className="relative flex items-center rounded-t-xl bg-muted/90 px-4 py-3 dark:bg-slate-950">
										<span className="flex items-center">{stars()}</span>
										<span className="px-2">{randomReview()} Reviews</span>
										<span className="niceBtn absolute right-4 px-2 font-bold text-white shadow-epic">
											{salesTxt[Math.ceil(Math.random() * salesTxt.length)]}
										</span>
									</header>
									{product.images[0] && (
										<div className="relative aspect-square w-full overflow-hidden">
											<Image
												className="group-hover:rotate hover-perspective w-full bg-transparent object-cover object-center transition-opacity"
												src={product.images[0]}
												width={768}
												height={768}
												sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
												alt=""
											/>
										</div>
									)}
									<div className="rounded-b-xl bg-muted/90 px-4 py-3 dark:bg-slate-950">
										<h2 className="text-base font-semibold text-neutral-700 dark:text-white">
											{product.name}
										</h2>
										<footer className="text-sm font-medium text-neutral-900 dark:text-white">
											{product.default_price.unit_amount && (
												<p>
													{formatMoney({
														amount: product.default_price.unit_amount,
														currency: product.default_price.currency,
														locale,
													})}
												</p>
											)}
										</footer>
									</div>
								</article>
							</YnsLink>
						</li>
					);
				})}
			</ul>
			<JsonLd jsonLd={mappedProductsToJsonLd(products)} />
		</>
	);
};
