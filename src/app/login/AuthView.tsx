"use client";

import React, { useState } from "react";
import { redirect } from "next/navigation";
import { SignUpClient as Signup } from "./signup/client";
import { SignInClient as Signin } from "./signin/client";

interface AuthViewProps {
	cart?: boolean;
	user?: object | null;
	info?: string | null;
}

// Update the function to receive props
export const AuthView: React.FC<AuthViewProps> = ({ cart = false, user = false, info = null }) => {
	const [view, setView] = useState<"Signup" | "Signin">("Signin");
	const components = { Signup, Signin };
	const Component = components[view];
	if (user) {
		return redirect("/myaccount");
	}
	return <Component setView={setView} cart={cart} info={info} />;
};
