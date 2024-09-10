import type { Metadata } from "next/types";
import { getTranslations } from "next-intl/server";
import * as Commerce from "commerce-kit";
import { ProductList } from "@/ui/products/productList";
import { publicUrl } from "@/env.mjs";
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from "@/ui/shadcn/breadcrumb";
import { YnsLink } from "@/ui/YnsLink";

export const generateMetadata = async (): Promise<Metadata> => {
	const t = await getTranslations("/products.metadata");
	return {
		title: t("title"),
		alternates: { canonical: `${publicUrl}/products` },
	};
};

export default async function AllProductsPage() {
	const products = await Commerce.productBrowse({ first: 100 });
	const t = await getTranslations("/products.page");

	return (
		<main className="pb-8">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink
							asChild
							className="inline-flex min-h-12 min-w-12 items-center justify-center"
						>
							<YnsLink href="/">{t("home")}</YnsLink>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{t("allProducts")}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<h1 className="text-3xl font-bold leading-none tracking-tight text-foreground">
				{t("title")}
			</h1>
			<ProductList products={products} />
		</main>
	);
}
