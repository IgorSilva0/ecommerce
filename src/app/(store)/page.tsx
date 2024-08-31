import type { Metadata } from "next/types";
import * as Commerce from "commerce-kit";
import { ProductList } from "@/ui/products/productList";
import { publicUrl } from "@/env.mjs";
import { Header } from "@/app/(store)/header";

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
			<ProductList products={products} />

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
