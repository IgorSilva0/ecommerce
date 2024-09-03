import { RiHome4Line, RiMenuSearchLine, RiUser3Line } from "react-icons/ri";
import { YnsLink } from "@/ui/YnsLink";
import { CartSummaryNav } from "@/ui/nav/CartSummaryNav";

const ICON_SIZE = 24;

export const NavMobile = () => {
	return (
		<nav className="sticky bottom-0 flex w-full justify-between bg-white px-4 py-3 text-xs dark:bg-slate-900 md:hidden">
			<YnsLink href="/" className="flex flex-col items-center" aria-label="Home">
				<RiHome4Line size={ICON_SIZE} />
				<p>Home</p>
			</YnsLink>
			<YnsLink href="/products" className="flex flex-col items-center" aria-label="Shop">
				<RiMenuSearchLine size={ICON_SIZE} />
				<p>Shop</p>
			</YnsLink>
			<div className="flex flex-col items-center" aria-label="Cart">
				<CartSummaryNav />
				<p>Cart</p>
			</div>
			<YnsLink href="/myaccount" className="flex flex-col items-center" aria-label="Account">
				<RiUser3Line size={ICON_SIZE} />
				<p>Account</p>
			</YnsLink>
		</nav>
	);
};
