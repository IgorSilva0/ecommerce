import Image from "next/image";
import { getLocale } from "next-intl/server";
import type * as Commerce from "commerce-kit";
import { JsonLd, mappedProductsToJsonLd } from "@/ui/JsonLd";
import { YnsLink } from "@/ui/YnsLink";
import { formatMoney } from "@/lib/utils";

export const ProductList = async ({ products }: { products: Commerce.MappedProduct[] }) => {
	const locale = await getLocale();

	return (
		<>
			<ul className="mt-5 grid grid-cols-1 gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((product, idx) => {
					return (
						<li key={product.id} className="group">
							<YnsLink href={`/product/${product.metadata.slug}`}>
								<article className="overflow-hidden rounded-xl border">
									{product.images[0] && (
										<div className="relative aspect-square w-full overflow-hidden bg-white hover:bg-gray-200 dark:bg-slate-800/30 dark:hover:bg-slate-800/5">
											<Image
												className="group-hover:rotate hover-perspective w-full bg-transparent object-cover object-center transition-opacity"
												src={product.images[0]}
												width={768}
												height={768}
												loading={idx < 3 ? "eager" : "lazy"}
												priority={idx < 3}
												sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
												alt=""
											/>
											<span className="absolute right-0 top-0 text-xl">🔥</span>
										</div>
									)}
									<div className="bg-muted/70 p-4">
										<h2 className="text-lg font-semibold text-neutral-700 dark:text-white">
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
