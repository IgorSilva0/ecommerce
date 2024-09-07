"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/ui/shadcn/button";

export const AddToCartButton = ({ productId }: { productId: string }) => {
	const t = useTranslations("Global.addToCart");
	const router = useRouter();
	const [pending, startTransition] = useTransition();

	return (
		<Button
			size="lg"
			type="submit"
			className="w-full rounded-full border-2 text-lg transition-all hover:border-black hover:bg-transparent hover:text-black dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-black"
			onClick={async () => {
				startTransition(() => router.push(`/cart-overlay?add=${productId}`));
			}}
			aria-disabled={pending}
		>
			{pending ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : t("actionButton")}
		</Button>
	);
};
