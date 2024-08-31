import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

export default function Quality() {
	return (
		<div className="text-center">
			<h1 className="bg-neutral-200 py-5 text-3xl font-bold">Quality Guarantee</h1>
			<div className="rounded-lg bg-white p-6 shadow-md">
				<a href="/" className="text-2xl hover:text-gray-500">
					<FaArrowLeft />
				</a>
				<h2 className="mb-3 text-2xl font-semibold">Our Quality</h2>
				<p className="mb-4 text-lg">
					At Your New Store, we are committed to providing our customers with the highest quality
					products. Our quality guarantee ensures that every item you purchase from us meets the
					highest standards of excellence. We take pride in the craftsmanship and durability of our
					products, and we stand behind them 100%.
				</p>
				<h2 className="mb-3 text-2xl font-semibold">Our Commitment to Quality</h2>
				<p className="mb-4 text-lg">
					We source our products from reputable manufacturers who share our commitment to quality.
					Each product undergoes rigorous testing and quality control processes to ensure it meets
					our stringent standards. From the materials used to the final product, we pay attention to
					every detail to ensure you receive only the best.
				</p>
				<h2 className="mb-3 text-2xl font-semibold">Quality Control Process</h2>
				<p className="mb-4 text-lg">Our quality control process includes:</p>
				<ul className="mb-4 list-inside list-disc">
					<li className="mb-2 text-lg">
						Thorough inspection of raw materials to ensure they meet our quality standards.
					</li>
					<li className="mb-2 text-lg">
						Regular audits of our manufacturing partners to ensure compliance with our quality
						requirements.
					</li>
					<li className="mb-2 text-lg">
						Multiple stages of product testing, including durability, functionality, and safety
						tests.
					</li>
					<li className="mb-2 text-lg">
						Final inspection of finished products before they are shipped to our warehouse.
					</li>
				</ul>
				<h2 className="mb-3 text-2xl font-semibold">Customer Satisfaction</h2>
				<p className="mb-4 text-lg">
					Your satisfaction is our top priority. If you are not completely satisfied with the
					quality of your purchase, we offer a hassle-free return and exchange policy. Simply
					contact our customer service team, and we will work with you to resolve any issues.
				</p>
				<h2 className="mb-3 text-2xl font-semibold">Sustainable Practices</h2>
				<p className="mb-4 text-lg">
					We are committed to sustainability and ethical practices. Our products are made with
					environmentally friendly materials, and we strive to minimize our carbon footprint
					throughout the production process. By choosing [Your Store Name], you are supporting a
					company that values sustainability and ethical practices.
				</p>
				<h2 className="mb-3 text-2xl font-semibold">Contact Us</h2>
				<p className="mb-4 text-lg">
					If you have any questions or concerns about our quality guarantee, please do not hesitate
					to contact us. Our customer service team is here to assist you and ensure you have a
					positive shopping experience.
				</p>
				<p className="mb-4 text-lg">
					Thank you for choosing Your New Store. We look forward to serving you with the highest
					quality products and exceptional customer service.
				</p>
				<div className="flex w-full justify-center">
					<a
						href="/"
						className="mt-8 flex w-fit items-center justify-center gap-2 rounded-lg border-2 border-black bg-black px-5 py-1 text-lg text-white transition-all hover:bg-transparent hover:text-black"
					>
						<FaArrowLeft className="text-lg" />
						Return
					</a>
				</div>
			</div>
		</div>
	);
}
