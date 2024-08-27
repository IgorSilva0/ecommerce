"use client";

import React, { useState } from "react";
import { SignUpClient as Signup } from "./signup/client";
import { SignInClient as Signin } from "./signin/client";

interface AuthViewProps {
	cart?: boolean;
}

// Update the function to receive props
export const AuthView: React.FC<AuthViewProps> = ({ cart = false }) => {
	const [view, setView] = useState<"Signup" | "Signin">("Signin");
	const components = { Signup, Signin };
	const Component = components[view];

	return (
		<div className="flex justify-center md:min-h-[80dvh]">
			<Component setView={setView} cart={cart} />
		</div>
	);
};
