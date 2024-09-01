import type { Metadata } from "next/types";
import * as Commerce from "commerce-kit";
import { ProductList } from "@/ui/products/productList";
import { publicUrl } from "@/env.mjs";
import { Header } from "@/app/(store)/header";
import { YnsLink } from "@/ui/YnsLink";

export const metadata = {
	alternates: { canonical: publicUrl },
} satisfies Metadata;

export default async function Home() {
	const products = await Commerce.productBrowse({ first: 6 });

	return (
		<main>
			<section className="rounded">
				<Header />
			</section>
			<h2 className="my-10 text-center text-3xl font-semibold">Featured Products</h2>
			<ProductList products={products} />
			<div className="mt-10 flex w-full justify-center">
				<YnsLink
					href="/products"
					className="bg-primary-500 w-fit rounded-lg border-2 border-black bg-black px-10 py-2 text-base font-semibold text-white transition-all hover:bg-transparent hover:text-black"
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
