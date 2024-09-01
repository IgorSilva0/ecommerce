"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { FaMoon, FaSun } from "react-icons/fa";
import { cn } from "@/lib/utils";

const useTheme = () => {
	const [isDarkMode, setIsDarkMode] = React.useState(
		() => typeof window !== "undefined" && window.localStorage.getItem("theme") === "dark",
	);

	React.useEffect(() => {
		const root = window.document.documentElement;
		if (isDarkMode) {
			root.classList.add("dark");
			window.localStorage.setItem("theme", "dark");
		} else {
			root.classList.remove("dark");
			window.localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

	const toggleTheme = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	return { isDarkMode, toggleTheme };
};

const Switch = React.forwardRef<
	React.ElementRef<typeof SwitchPrimitives.Root>,
	React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
	// State to handle the current theme
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<SwitchPrimitives.Root
			className={cn(
				"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-sky-600 data-[state=unchecked]:bg-sky-400",
				className,
			)}
			{...props}
			ref={ref}
			checked={isDarkMode}
			onCheckedChange={toggleTheme}
		>
			{/* Conditionally render icons based on the current state */}
			{isDarkMode ? (
				<FaMoon className="absolute ml-[1px] text-yellow-500" />
			) : (
				<FaSun className="absolute right-0 text-xl text-yellow-400" />
			)}
			<SwitchPrimitives.Thumb
				className={cn(
					"pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0",
				)}
			/>
		</SwitchPrimitives.Root>
	);
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
