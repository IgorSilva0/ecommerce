"use client";

import cn from "classnames";
import React, { forwardRef, useRef, type ButtonHTMLAttributes } from "react";
import { mergeRefs } from "react-merge-refs";
import styles from "./Button.module.css"; // CSS module import
import { LoadingDots } from "@ui/LoadingDots"; // Ensure this is correctly imported

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "slim" | "flat";
	active?: boolean;
	width?: number;
	loading?: boolean;
	disabled?: boolean;
	Component?: React.ElementType; // Use React.ElementType instead of any
}

export const Button = forwardRef<HTMLButtonElement, Props>((props, buttonRef) => {
	const {
		className,
		variant = "flat",
		children,
		active,
		width,
		loading = false,
		disabled = false,
		style = {},
		Component = "button",
		...rest
	} = props;

	const ref = useRef<HTMLButtonElement>(null); // Ref type declaration

	// Use classnames with CSS modules
	const rootClassName = cn(
		styles.root,
		{
			[styles.slim!]: variant === "slim",
			[styles.loading!]: loading,
			[styles.disabled!]: disabled,
		},
		className, // external classes passed in props
	);

	return (
		<Component
			aria-pressed={active}
			data-variant={variant}
			ref={mergeRefs([ref, buttonRef])} // Merging refs
			className={rootClassName} // Applying the constructed class names
			disabled={disabled || loading} // Disable button if loading or disabled
			style={{
				width,
				...style,
			}}
			{...rest} // Spread remaining props
		>
			{children}
			{loading && (
				<i className="m-0 flex pl-2">
					<LoadingDots />
				</i>
			)}
		</Component>
	);
});

Button.displayName = "Button";
