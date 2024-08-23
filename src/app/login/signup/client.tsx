import Link from "next/link";
import { SignUpServer } from "../signup/server";
import { Button } from "@/ui/Button";

export const SignUpClient = () => {
	const postData = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		try {
			await SignUpServer(formData);
		} catch (error) {
			console.error("Sign up failed:", error);
		}
	};
	return (
		<div className="flex w-full flex-1 justify-center">
			<div className="bg-socskyblue flex w-full flex-1 flex-col items-center justify-center px-8 shadow-2xl"></div>
			<div className="flex w-full flex-1 items-center justify-center gap-2 px-8">
				<form
					onSubmit={postData} // Changed from action to onSubmit for client-side form handling
					method="POST"
					className="animate-fade-left bg-loginblue flex w-[50%] flex-col justify-center gap-2 rounded-2xl p-10 text-foreground shadow-md"
				>
					<label className="text-md text-white" htmlFor="email">
						Email
					</label>
					<input
						id="email"
						className="mb-6 rounded-2xl border bg-inherit bg-white px-4 py-2 dark:text-black"
						name="email"
						placeholder="email@example.com"
						type="email"
						autoComplete="email"
						required
					/>
					<label className="text-md text-white" htmlFor="password">
						Password
					</label>
					<input
						id="password"
						className="mb-6 rounded-2xl border bg-inherit bg-white px-4 py-2 dark:text-black"
						type="password"
						name="password"
						placeholder="••••••••"
						autoComplete="new-password"
						minLength={6}
						required
					/>
					<Button pendingText="Submitting...">Sign Up</Button>
					<p className="mt-4 text-center text-black">
						Already have an account?{" "}
						<Link href="/login" className="font-bold underline hover:text-black">
							Login
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};
