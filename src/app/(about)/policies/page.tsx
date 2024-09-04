import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { YnsLink } from "@/ui/YnsLink";
import { Nav } from "@/ui/nav/Nav";

export default function Policies() {
	return (
		<>
			<Nav />
			<div className="text-center">
				<h1 className="bg-neutral-200 py-5 text-3xl font-bold dark:bg-slate-900">Our Policies</h1>
				<div className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
					<YnsLink href="/" className="text-2xl hover:text-gray-500">
						<FaArrowLeft />
					</YnsLink>
					<section className="mb-8">
						<h2 className="mb-4 text-2xl font-semibold">Return and Refund Policy</h2>
						<p className="mb-4 text-lg">
							At Your New Store, we are committed to ensuring your satisfaction with every purchase.
							If you are not completely satisfied, you may return items within 30 days of the
							purchase date for a full refund or exchange. The returned product must be in its
							original condition and packaging.
						</p>
						<p className="mb-4 text-lg">
							Refunds will be processed within 7-10 business days of receiving the returned product.
							The refund will be issued to the original payment method. Please note that shipping
							costs are non-refundable.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 text-2xl font-semibold">Privacy Policy</h2>
						<p className="mb-4 text-lg">
							Your privacy is important to us. This policy explains how we collect, use, and
							safeguard your personal information when you visit our website and make a purchase.
						</p>
						<p className="mb-4 text-lg">
							We collect personal information such as your name, email address, shipping address,
							and payment information to process your orders and provide a seamless service. We do
							not share your information with third parties, except as necessary to fulfill your
							order or as required by law.
						</p>
						<p className="mb-4 text-lg">
							We implement industry-standard security measures to protect your information. While we
							strive to secure your data, no method of electronic storage or transmission is
							entirely secure. We cannot guarantee absolute security.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 text-2xl font-semibold">Data Storage and Security</h2>
						<p className="mb-4 text-lg">
							We store your data securely using encryption and other protection measures to prevent
							unauthorized access, alteration, or destruction. We retain your data only as long as
							necessary to provide services and comply with legal obligations.
						</p>
						<p className="mb-4 text-lg">
							You have the right to access, update, or delete your personal information at any time.
							Please reach out to our customer service team for any changes to your data.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 text-2xl font-semibold">Shipping Policy</h2>
						<p className="mb-4 text-lg">
							We offer prompt and reliable shipping to ensure you receive your orders quickly.
							Orders are processed within 1-2 business days and shipped via [Shipping Carrier]. You
							will receive a tracking number once your order is on its way.
						</p>
						<p className="mb-4 text-lg">
							Delivery times vary by location. For estimated delivery times, please refer to our
							shipping information page. For any questions regarding your shipment, please contact
							our customer service team.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 text-2xl font-semibold">Terms of Service</h2>
						<p className="mb-4 text-lg">
							By using our website and purchasing from us, you agree to our terms of service. These
							terms outline your rights and responsibilities when using our website and services. We
							encourage you to review them carefully before making a purchase.
						</p>
						<p className="mb-4 text-lg">
							We reserve the right to update these terms at any time. Any changes will be posted on
							this page, and your continued use of our website signifies your acceptance of the
							updated terms.
						</p>
					</section>

					<section className="mb-8">
						<h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
						<p className="mb-4 text-lg">
							If you have any questions or concerns regarding our policies, please don&apos;t
							hesitate to contact us. Our customer service team is dedicated to assisting you and
							ensuring a positive shopping experience.
						</p>
						<p className="mb-4 text-lg">
							Thank you for choosing Your New Store. We are committed to providing you with
							top-quality products and exceptional customer service.
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
		</>
	);
}
