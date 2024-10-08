import React, { useState } from "react";
import { SignUpServer } from "./server";
import { Button } from "@/ui/Button";

type ViewType = "Signup" | "Signin";

export const SignUpClient = ({
	setView,
	cart,
	info,
}: {
	setView: React.Dispatch<React.SetStateAction<ViewType>>;
	cart: boolean; // optional
	info: string | null; // optional
}) => {
	const [invalid, setInvalid] = useState(false);

	const postData = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setInvalid(false);
		const formData = new FormData(e.currentTarget);
		try {
			const log = await SignUpServer(formData, cart);
			if (log) {
				setInvalid(true);
			}
		} catch (error) {
			console.error("Sign up failed:", error);
		}
	};

	const changeView = () => {
		setView("Signin");
	};

	return (
		<div className="flex flex-col">
			{info ? <p className="mb-5 text-2xl font-bold leading-none tracking-tight">{info}</p> : null}
			<form
				onSubmit={postData}
				method="POST"
				className="flex w-[100%] flex-col justify-center gap-2 rounded-lg bg-white px-6 py-12 text-foreground shadow-epic dark:bg-slate-950 md:w-[500px] md:px-14"
			>
				<h2 className="mb-2 text-xl font-bold md:text-2xl">Create your account</h2>
				<label className="text-md flex items-center gap-2" htmlFor="honorificprefix">
					Title :
					<select
						id="honorificprefix"
						className="rounded-lg border bg-inherit py-0 pr-8 dark:bg-slate-950"
						name="honorificprefix"
						required
					>
						<option value="" className="text-gray-500">
							select
						</option>
						<option value="Mr">Mr.</option>
						<option value="Mrs">Mrs.</option>
						<option value="Miss">Miss</option>
						<option value="Ms">Ms.</option>
						<option value="Dr">Dr.</option>
						<option value="Prof">Prof.</option>
						<option value="Mx">Mx.</option>
					</select>
				</label>
				<label className="text-md" htmlFor="firstname">
					First Name
				</label>
				<input
					id="firstname"
					className="mb-1 rounded-xl border bg-inherit px-4 py-2"
					name="firstname"
					placeholder="first name"
					type="text"
					autoComplete="given-name"
					required
				/>
				<label className="text-md" htmlFor="lastname">
					Last Name
				</label>
				<input
					id="lastname"
					className="mb-1 rounded-xl border bg-inherit px-4 py-2"
					name="lastname"
					placeholder="last name"
					type="text"
					autoComplete="family-name"
					required
				/>
				<label className="text-md" htmlFor="email">
					Email
				</label>
				<input
					id="email"
					className="mb-1 rounded-xl border bg-inherit px-4 py-2"
					name="email"
					placeholder="email@example.com"
					type="email"
					autoComplete="email"
					required
				/>
				<label className="text-md" htmlFor="password">
					Password
				</label>
				<input
					id="password"
					className="mb-6 rounded-xl border bg-inherit px-4 py-2"
					type="password"
					name="password"
					placeholder="••••••••"
					autoComplete="new-password"
					minLength={6}
					required
				/>
				<Button
					pendingText="Submitting..."
					className="border-2 transition-all dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-black"
				>
					Create account
				</Button>
				{invalid ? (
					<p className="self-center font-semibold text-red-500">User already registered</p>
				) : null}
				<p className="self-center">
					Already have a account?{" "}
					<button
						onClick={changeView}
						type="reset"
						className="mt-2 hover:text-gray-600 dark:hover:text-gray-300"
					>
						<b>Sign in</b>
					</button>
				</p>
			</form>
		</div>
	);
};
