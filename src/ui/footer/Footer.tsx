import { YnsLink } from "@/ui/YnsLink";

export async function Footer() {
	return (
		<footer className="flex w-full justify-center bg-neutral-200 p-6 text-neutral-800 dark:bg-slate-950 dark:text-white md:py-12">
			<span className="niceBtn flex h-11 items-center text-sm font-semibold">
				<YnsLink
					className="mx-1 rounded-md bg-white p-2 dark:bg-black"
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
