import { YnsLink } from "@/ui/YnsLink";

export async function Footer() {
	return (
		<footer className="flex w-full justify-center bg-white p-6 text-neutral-800 dark:bg-slate-950 dark:text-white md:py-8">
			<span className="niceBtn flex items-center p-[3px] text-sm font-semibold">
				<YnsLink
					className="rounded-md bg-white p-2 dark:bg-black"
					href="https://www.igorsilva.me/"
					target="_blank"
					rel="noreferrer"
				>
					© Powered by Igor ❣️
				</YnsLink>
			</span>
		</footer>
	);
}
