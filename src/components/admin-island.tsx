"use client"
import { clsx } from "@julseb-lib/react"

export function AdminIsland({
	element: Element = "div",
	children,
	className,
}: IAdminIsland) {
	return (
		<Element
			className={clsx(
				"bg-background p-6 rounded-lg",
				className,
				"admin-island",
			)}
		>
			{children}
		</Element>
	)
}

interface IAdminIsland {
	element?: ElementType
	children?: Children
	className?: string
}
