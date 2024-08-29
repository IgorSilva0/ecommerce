import {
	RiHome4Line,
	//RiHome4Fill,
	RiMenuSearchLine,
	//RiMenuSearchFill,
	RiUser3Line,
	//RiUser3Fill,
} from "react-icons/ri";
import Link from "next/link";
import { CartSummaryNav } from "@/ui/nav/CartSummaryNav";

export const NavMobile = () => {
	const iconsSize = 24;
	return (
		<nav className="sticky -bottom-1 flex w-full justify-between bg-white px-4 pb-5 pt-3 text-xs md:hidden">
			<Link href={"/"} className="flex flex-col items-center">
				<RiHome4Line size={iconsSize} />
				<p>Home</p>
			</Link>
			<Link href={"/products"} className="flex flex-col items-center">
				<RiMenuSearchLine size={iconsSize} />
				Shop
			</Link>
			<div className="flex flex-col items-center">
				<CartSummaryNav />
				Cart
			</div>
			<Link href={"/myaccount"} className="flex flex-col items-center">
				<RiUser3Line size={iconsSize} />
				Account
			</Link>
		</nav>
	);
};
