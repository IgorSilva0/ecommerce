"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/ui/shadcn/card";
import { Carousel, CarouselContent, CarouselItem } from "@/ui/shadcn/carousel";

const carouselItems = [
	{
		title: "Welcome to Your New Store",
		description: "Your one-stop destination for all your shopping needs",
		buttonText: "Shop Now",
		imageSrc: "https://images.unsplash.com/photo-1509057199576-632a47484ece",
		imageAlt: "Storefront Image",
	},
	{
		title: "Discover Amazing Products",
		description: "Find the best deals and offers just for you",
		buttonText: "Explore Now",
		imageSrc: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
		imageAlt: "Product Display Image",
	},
	{
		title: "Exclusive Collections",
		description: "Browse our exclusive collections and latest trends",
		buttonText: "Browse Collections",
		imageSrc: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
		imageAlt: "Fashion Collection Image",
	},
	{
		title: "Unbeatable Prices",
		description: "Get the best value for your money with our unbeatable prices",
		buttonText: "Shop Deals",
		imageSrc: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
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
	const autoplay = useRef(Autoplay({ delay: 10000, stopOnInteraction: false }));

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
											<p className="text-lg text-neutral-600">{item.description}</p>
											<a
												href="/products"
												className="mt-4 rounded-lg border-2 border-black bg-black px-4 py-2 font-semibold text-white hover:bg-transparent hover:text-black"
											>
												{item.buttonText}
											</a>
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
		</Carousel>
	);
}
