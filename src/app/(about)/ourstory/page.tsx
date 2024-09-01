import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { YnsLink } from "@/ui/YnsLink";

export default function OurStory() {
	return (
		<div className="text-center">
			<h1 className="bg-neutral-200 py-5 text-3xl font-bold dark:bg-slate-800">Our Story</h1>
			<div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-700">
				<YnsLink href="/" className="text-2xl hover:text-gray-500">
					<FaArrowLeft />
				</YnsLink>
				<section className="mb-8">
					<h2 className="mb-4 text-2xl font-semibold">Our Beginnings</h2>
					<p className="mb-4 text-lg">
						Your New Store was born out of a passion for [specific field or interest related to your
						products]. Founded by [Your Name], our journey began with a simple idea: to provide
						high-quality [products/services] that [solve a problem or meet a need] for our
						customers.
					</p>
					<p className="mb-4 text-lg">
						From our humble beginnings, we have grown into a [describe your company size or scope],
						driven by a commitment to excellence and a dedication to customer satisfaction. Our
						mission has always been to [state your mission or core values], and we strive to bring
						this vision to life in every product we offer and every interaction we have.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 text-2xl font-semibold">Our Vision</h2>
					<p className="mb-4 text-lg">
						At Your New Store, we envision a world where [describe your vision related to the
						industry or customer experience]. Our goal is to continuously innovate and improve,
						ensuring that we not only meet but exceed our customers&apos; expectations.
					</p>
					<p className="mb-4 text-lg">
						We are driven by the desire to [specific aspect of your vision or impact], and we are
						committed to [describe any sustainability, community engagement, or ethical practices].
						This vision guides us every day as we work to make a positive difference through our
						products and services.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 text-2xl font-semibold">Our Team</h2>
					<p className="mb-4 text-lg">
						Behind Your New Store is a dedicated team of professionals who share a common passion
						for [industry/field]. Each member of our team brings unique skills and expertise,
						contributing to our collective success and ensuring that we deliver the best possible
						experience to our customers.
					</p>
					<p className="mb-4 text-lg">
						From [briefly describe key roles or team members] to [mention any special departments or
						teams], every individual plays a vital role in our mission. Together, we are committed
						to upholding our values and delivering exceptional [products/services].
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 text-2xl font-semibold">Our Commitment</h2>
					<p className="mb-4 text-lg">
						At Your New Store, our commitment to our customers is at the heart of everything we do.
						We are dedicated to providing high-quality [products/services] and exceptional customer
						service. Your satisfaction is our priority, and we are always here to assist you and
						ensure you have a positive experience with us.
					</p>
					<p className="mb-4 text-lg">
						We are grateful for the support of our community and customers, and we look forward to
						continuing our journey with you. Thank you for being a part of our story.
					</p>
				</section>

				<section className="mb-8">
					<h2 className="mb-4 text-2xl font-semibold">Get in Touch</h2>
					<p className="mb-4 text-lg">
						We would love to hear from you! Whether you have questions, feedback, or just want to
						connect, please feel free to reach out to us. Our team is always happy to chat and
						assist in any way we can.
					</p>
					<p className="mb-4 text-lg">
						Thank you for visiting Your New Store. We are excited to share our journey with you and
						to provide you with the best [products/services] in the industry.
					</p>
				</section>
				<div className="flex w-full justify-center">
					<YnsLink
						href="/"
						className="mt-8 flex w-fit items-center justify-center gap-2 rounded-lg border-2 border-black bg-black px-5 py-1 text-lg text-white transition-all hover:bg-transparent hover:text-black dark:border-white dark:bg-transparent dark:hover:bg-white dark:hover:text-black"
					>
						<FaArrowLeft className="text-lg" />
						Return
					</YnsLink>
				</div>
			</div>
		</div>
	);
}
