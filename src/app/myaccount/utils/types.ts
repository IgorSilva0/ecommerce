// types.ts

// Define the structure of a product in an order
export interface Product {
	id: string;
	url: string;
	name: string;
	type: string;
	active: boolean;
	images: string[];
	object: string;
	created: number;
	updated: number;
	livemode: boolean;
	metadata: {
		slug: string;
	};
	tax_code: string;
	shippable: boolean;
	attributes: unknown[];
	unit_label: string;
	description: string;
	default_price: {
		id: string;
		type: string;
		active: boolean;
		object: string;
		created: number;
		product: string;
		currency: string;
		livemode: boolean;
		metadata: unknown;
		nickname: string;
		recurring: unknown;
		lookup_key: string;
		tiers_mode: string;
		unit_amount: number;
		tax_behavior: string;
		billing_scheme: string;
		custom_unit_amount: unknown;
		transform_quantity: unknown;
		unit_amount_decimal: string;
	};
	marketing_features: unknown[]; // Adjust based on the actual feature structure
	package_dimensions: unknown;
	statement_descriptor: string;
}

// Define the structure of an item in the order
export interface Item {
	product: Product;
	quantity: number;
}

// Define the structure of a tax applied to the order
export interface Tax {
	taxType: string;
	taxAmount: number;
	taxPercentage: string;
}

// Define the structure of a shipping rate for the order
export interface ShippingRate {
	id: string;
	type: string;
	active: boolean;
	object: string;
	created: number;
	livemode: boolean;
	metadata: unknown;
	tax_code: string;
	display_name: string;
	fixed_amount: {
		amount: number;
		currency: string;
	};
	tax_behavior: string;
	delivery_estimate: {
		maximum: {
			unit: string;
			value: number;
		};
		minimum: {
			unit: string;
			value: number;
		};
	};
}

// Define the structure of shipping details for the order
export interface ShippingDetails {
	name: string;
	phone: string;
	address: {
		city: string;
		line1: string;
		line2: string;
		state: string;
		country: string;
		postal_code: string;
	};
	carrier: string;
	tracking_number: string;
}

// Define the structure of payment method details used for the order
export interface PaymentMethodDetails {
	id: string;
	card: {
		brand: string;
		last4: string;
		checks: {
			cvc_check: string;
			address_line1_check: string;
			address_postal_code_check: string;
		};
		wallet: unknown;
		country: string;
		funding: string;
		exp_year: number;
		networks: {
			available: string[];
			preferred: string;
		};
		exp_month: number;
		fingerprint: string;
		display_brand: string;
		generated_from: unknown;
		three_d_secure_usage: {
			supported: boolean;
		};
	};
	type: string;
	object: string;
	created: number;
	customer: unknown;
	livemode: boolean;
	metadata: unknown;
	allow_redisplay: string;
	billing_details: {
		name: string;
		email: string;
		phone: string;
		address: {
			city: string;
			line1: string;
			line2: string;
			state: string;
			country: string;
			postal_code: string;
		};
	};
}

// Define the structure of an order
export interface Order {
	id: number;
	user_id: string;
	order_id: string;
	items: Item[];
	total_price: number;
	delivery_status: string;
	parcel_tracking: string;
	created_at: string;
	delivered_at: string;
	currency: string;
	tax: Tax[];
	shipping_rate: ShippingRate[];
	shipping_details: ShippingDetails[];
	payment_method_details: PaymentMethodDetails[];
}

// Define the possible responses for the OrdersData function
export type OrdersDataResponse = Order[];
