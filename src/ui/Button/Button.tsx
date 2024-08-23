"use client";

import React, { forwardRef, useRef, type ButtonHTMLAttributes } from "react";
import { mergeRefs } from "react-merge-refs";
import cn from "classnames";
import { useFormStatus } from "react-dom";
import styles from "./Button.module.css";
import { LoadingDots } from "@ui/LoadingDots";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	pendingText?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
	({ children, pendingText, className, style = {}, ...props }, buttonRef) => {
		const ref = useRef<HTMLButtonElement>(null);
		const { pending: isPending } = useFormStatus();

		const rootClassName = cn(
			styles.root,
			{
				[styles.loading!]: isPending,
			},
			className,
		);

		return (
			<button
				{...props}
				type="submit"
				ref={mergeRefs([ref, buttonRef])}
				className={rootClassName}
				aria-disabled={isPending}
				disabled={isPending}
				style={style}
			>
				{isPending ? (
					<>
						{pendingText}
						<i className="ml-2 flex">
							<LoadingDots />
						</i>
					</>
				) : (
					children
				)}
			</button>
		);
	},
);

Button.displayName = "Button";
