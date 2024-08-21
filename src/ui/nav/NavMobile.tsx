import {
	RiHome4Line,
	//RiHome4Fill,
	RiMenuSearchLine,
	//RiMenuSearchFill,
	RiShoppingCartLine,
	//RiShoppingCartFill,
	RiUser3Line,
	//RiUser3Fill,
} from "react-icons/ri";

export const NavMobile = () => {
	const iconsSize = 24;
	return (
		<nav className="sticky -bottom-1 flex w-full justify-between bg-white px-4 pb-5 pt-3 text-xs md:hidden">
			<div className="flex flex-col items-center">
				<RiHome4Line size={iconsSize} />
				<p>Home</p>
			</div>
			<div className="flex flex-col items-center">
				<RiMenuSearchLine size={iconsSize} />
				Shop
			</div>
			<div className="flex flex-col items-center">
				<RiShoppingCartLine size={iconsSize} />
				Cart
			</div>
			<div className="flex flex-col items-center">
				<RiUser3Line size={iconsSize} />
				Account
			</div>
		</nav>
	);
};
