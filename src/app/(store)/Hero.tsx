"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
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
		title: "Welcome to Our Online Store",
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

export function Hero() {
	const autoplay = useRef(Autoplay({ delay: 12000, stopOnInteraction: false }));

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
						<div className="">
							<Card>
								<CardContent className="flex h-[23rem] cursor-grab items-center justify-center rounded-lg p-6 dark:bg-slate-950 sm:h-[24rem]">
									<div className="flex h-full w-full flex-col-reverse items-start justify-between sm:flex-row sm:items-center">
										<div className="mb-2 sm:px-10">
											<h3 className="text-lg font-semibold sm:text-2xl">{item.title}</h3>
											<p className="mb-5 text-sm text-neutral-600 dark:text-neutral-300 sm:mb-6 sm:text-lg">
												{item.description}
											</p>
											<YnsLink
												href="/products"
												className="rounded-lg border-2 border-black bg-black px-4 pb-3 pt-2 text-sm font-semibold text-white transition-all hover:bg-transparent hover:text-black dark:border-white dark:bg-transparent dark:hover:bg-white dark:hover:text-black sm:text-base"
											>
												{item.buttonText}
											</YnsLink>
										</div>
										<div className="sm:py-4">
											<Image
												src={item.imageSrc}
												alt={item.imageAlt}
												width={400}
												height={300}
												className="h-[12rem] w-[25rem] rounded-lg object-cover sm:h-[21rem] sm:w-[30rem]"
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
