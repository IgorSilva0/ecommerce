import { SignInServer } from "./server";
import { Button } from "@/ui/Button";

type ViewType = "Signup" | "Signin";

export const SignInClient = ({
	setView,
}: {
	setView: React.Dispatch<React.SetStateAction<ViewType>>;
}) => {
	const postData = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		try {
			await SignInServer(formData);
		} catch (error) {
			console.error("Sign up failed:", error);
		}
	};

	const changeView = () => {
		setView("Signup");
	};

	return (
		<div className="flex w-full justify-center py-10">
			<div className="flex w-full flex-1 items-center justify-center gap-2 px-8">
				<form
					onSubmit={postData}
					method="POST"
					className="flex w-[500px] flex-col justify-center gap-2 rounded-2xl px-14 pb-14 pt-10 text-foreground shadow-epic"
				>
					<h2 className="mb-2 text-3xl font-bold">Access your account</h2>
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
					<Button pendingText="Submitting..." className="">
						Sign In
					</Button>
					<p className="self-center">
						No account?{" "}
						<button onClick={changeView} type="reset" className="mt-2 hover:text-gray-600">
							<b>Create One!</b>
						</button>
					</p>
					<a type="reset" className="self-center hover:text-gray-600">
						Forgot your password?
					</a>
				</form>
			</div>
		</div>
	);
};
