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
	const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);

	return (
		<main>
			<section className="rounded">
				<Hero />
			</section>
			<div className="mt-20">
				<h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
					Featured Products
				</h1>
			</div>
			<ProductList products={randomProducts} />
			<div className="mb-4 mt-16 flex w-full justify-center">
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
