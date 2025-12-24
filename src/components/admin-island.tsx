"use client"
import { Flexbox, clsx } from "@julseb-lib/react"
import type { ILibFlexbox } from "@julseb-lib/react/component-props"

export function AdminIsland({ className, ...rest }: IAdminIsland) {
	return (
		<Flexbox
			className={clsx(
				"bg-background p-6 rounded-lg",
				className,
				"admin-island",
			)}
			{...rest}
		/>
	)
}

interface IAdminIsland extends ILibFlexbox {}
