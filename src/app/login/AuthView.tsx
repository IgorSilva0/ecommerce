"use client";

import React, { useState } from "react";
import { SignUpClient as Signup } from "./signup/client";
import { SignInClient as Signin } from "./signin/client";

export const AuthView = ({ type }: { type: "Signup" | "Signin" }) => {
	const [view, setView] = useState(type);

	// Create an object that maps the view state to the corresponding component
	const components = {
		Signup: Signup,
		Signin: Signin,
	};

	// Get the component to render based on the current view state
	const Component = components[view];

	return (
		<div>
			{/* Render the selected component */}
			<Component />

			{/* You can also include buttons to switch views for demonstration */}
			<button onClick={() => setView("Signup")}>Go to Sign Up</button>
			<button onClick={() => setView("Signin")}>Go to Sign In</button>
		</div>
	);
};
