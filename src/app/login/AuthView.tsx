"use client";

import React, { useState } from "react";
import { SignUpClient as Signup } from "./signup/client";
import { SignInClient as Signin } from "./signin/client";

export const AuthView = () => {
	// Explicitly type view as 'Signup' | 'Signin'
	const [view, setView] = useState<"Signup" | "Signin">("Signin");
	const components = { Signup, Signin };
	const Component = components[view];

	return (
		<div className="flex min-h-[80dvh] justify-center">
			<Component setView={setView} />
		</div>
	);
};
