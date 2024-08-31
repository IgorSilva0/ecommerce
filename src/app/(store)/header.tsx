"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/ui/shadcn/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/ui/shadcn/carousel";
import { YnsLink } from "@/ui/YnsLink";

const carouselItems = [
	{
		title: "Welcome to Your New Store",
		description: "Your one-stop destination for all your shopping needs",
		buttonText: "Shop Now",
		imageSrc:
			"https://media.istockphoto.com/id/1368355172/photo/proud-female-small-business-owner-in-front-of-the-store.jpg?s=1024x1024&w=is&k=20&c=R7y55Uza3YidBS2xhFCSAzLOEtUZtkrkeVZLgKl2G1s=",
		imageAlt: "Storefront Image",
	},
	{
		title: "Discover Amazing Products",
		description: "Find the best deals and offers just for you",
		buttonText: "Explore Now",
		imageSrc:
			"https://media.istockphoto.com/id/171150042/photo/sunrise-image-in-lcd-oxbow-bend-gtnp.jpg?s=2048x2048&w=is&k=20&c=i8cmxU7RJpKNTft1IxfB_wRMn7eShOLnSHU5lSLhM0M=",
		imageAlt: "Product Display Image",
	},
	{
		title: "Exclusive Collections",
		description: "Browse our exclusive collections and latest trends",
		buttonText: "Browse Collections",
		imageSrc:
			"https://media.istockphoto.com/id/2159558435/photo/clothes-hanging-on-a-hanger-in-a-store.jpg?s=2048x2048&w=is&k=20&c=SfimOhODFhccFJDDflu58r2Qt6NYw0Tzwqbq4sWeXac=",
		imageAlt: "Fashion Collection Image",
	},
	{
		title: "Unbeatable Prices",
		description: "Get the best value for your money with our unbeatable prices",
		buttonText: "Shop Deals",
		imageSrc:
			"https://media.istockphoto.com/id/2155573195/photo/shopping-cart-with-big-dollar-money-bag-extra-income-win-money-for-shopping-purchasing-power.jpg?s=2048x2048&w=is&k=20&c=CM9DLlVEaqVsRmFnfoy4US6IwiTrUbDUY8AEXTqC1jo=",
		imageAlt: "Discount Banner Image",
	},
	{
		title: "Fast and Secure Delivery",
		description: "Enjoy fast and secure delivery on all your orders",
		buttonText: "Order Now",
		imageSrc:
			"https://media.istockphoto.com/id/1340887756/photo/outside-of-logistics-distributions-warehouse-diverse-team-of-workers-loading-delivery-truck.jpg?s=1024x1024&w=is&k=20&c=UhXXWbSMmrEqupPNpd41xF_xN_sBdlL7CTqEgMGcWtw=",
		imageAlt: "Courier Delivering Package",
	},
];

export function Header() {
	const autoplay = useRef(Autoplay({ delay: 8000, stopOnInteraction: false }));

	return (
		<Carousel
			plugins={[autoplay.current]}
			className="px-auto h-full w-full"
			onMouseEnter={() => autoplay.current.stop()}
			onMouseLeave={() => autoplay.current.play()}
			opts={{
				loop: true,
				duration: 50,
			}}
		>
			<CarouselContent>
				{carouselItems.map((item, index) => (
					<CarouselItem key={index}>
						<div className="p-1">
							<Card>
								<CardContent className="flex h-[30rem] cursor-grab items-center justify-center p-6 sm:h-[24rem]">
									<div className="flex h-full w-full flex-col-reverse items-center justify-between sm:flex-row">
										<div className="sm:px-10">
											<h3 className="text-2xl font-semibold">{item.title}</h3>
											<p className="mb-6 text-lg text-neutral-600">{item.description}</p>
											<YnsLink
												href="/products"
												className="rounded-lg border-2 border-black bg-black px-4 py-2 font-semibold text-white hover:bg-transparent hover:text-black"
											>
												{item.buttonText}
											</YnsLink>
										</div>
										<div className="sm:py-4">
											<img
												src={item.imageSrc}
												alt={item.imageAlt}
												className="h-[15rem] w-[24rem] rounded-xl object-cover sm:h-[21rem] sm:w-[30rem]"
											/>
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="hidden sm:flex" />
			<CarouselNext className="hidden sm:flex" />
		</Carousel>
	);
}
