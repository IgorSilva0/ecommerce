import type { Metadata } from "next/types";
import * as Commerce from "commerce-kit";
import { ProductList } from "@/ui/products/productList";
import { publicUrl } from "@/env.mjs";
import { Hero } from "@/app/(store)/Hero";
import { YnsLink } from "@/ui/YnsLink";

export const metadata = {
	alternates: { canonical: publicUrl },
} satisfies Metadata;

export default async function Home() {
	const products = await Commerce.productBrowse({ last: 1 });
	const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 3);

	return (
		<main>
			<section className="rounded">
				<Hero />
			</section>
			<div className="relative mt-5 flex items-center justify-center sm:mt-7">
				<span className="absolute -bottom-1 left-1/2 h-8 w-36 -translate-x-1/2 scale-x-150 transform rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80 blur-sm"></span>

				<h2 className="relative z-20 text-center font-bold text-white drop-shadow-epic sm:text-xl">
					Featured Products
				</h2>
			</div>
			<ProductList products={randomProducts} />
			<div className="mt-10 flex w-full justify-center">
				<YnsLink
					href="/products"
					className="bg-primary-500 w-fit rounded-lg border-2 border-black bg-black px-10 py-2 text-base font-semibold text-white transition-all hover:bg-transparent hover:text-black dark:border-white dark:bg-transparent dark:hover:bg-white dark:hover:text-black"
				>
					View All Products
				</YnsLink>
			</div>
			{/* <section className="w-full py-8">
				<div className="grid gap-8 lg:grid-cols-2">
					{[
						{ categorySlug: "accessories", src: AccessoriesImage },
						{ categorySlug: "apparel", src: ApparelImage },
					].map(({ categorySlug, src }) => (
						<CategoryBox key={categorySlug} categorySlug={categorySlug} src={src} />
					))}
				</div>
			</section> */}
		</main>
	);
}
