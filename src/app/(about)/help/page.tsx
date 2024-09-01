import React from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa6";
import { Nav } from "@/ui/nav/Nav";
import { YnsLink } from "@/ui/YnsLink";

export default function Help() {
	return (
		<>
			<Nav />
			<div className="flex h-[80dvh] flex-col items-center justify-center">
				<Image
					src="/underconstruction.png"
					width={1500}
					height={800}
					alt="Avatar"
					className="mt-5 overflow-hidden rounded-full"
				/>
				<div className="flex w-full justify-center">
					<YnsLink
						href="/"
						className="mb-4 mt-8 flex w-fit items-center justify-center gap-2 rounded-lg border-2 border-black bg-black px-5 py-1 text-lg text-white transition-all hover:bg-transparent hover:text-black dark:border-white dark:bg-transparent dark:hover:bg-white dark:hover:text-black"
					>
						<FaArrowLeft className="text-lg" />
						Return
					</YnsLink>
				</div>
			</div>
		</>
	);
}
