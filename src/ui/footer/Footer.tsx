import { YnsLink } from "@/ui/YnsLink";

export async function Footer() {
	return (
		<footer className="flex w-full justify-center bg-neutral-200 p-6 text-neutral-800 dark:bg-slate-800 dark:text-white md:py-12">
			<span className="text-sm font-semibold">
				<YnsLink
					className="underline-offset-4 hover:underline"
					href="https://www.igorsilva.me/"
					target="_blank"
					rel="noreferrer"
				>
					Handcrafted with passion by Igor ❣️
				</YnsLink>
			</span>
		</footer>
	);
}
