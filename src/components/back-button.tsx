"use client"
import Link from "next/link"
import { BiChevronLeft } from "react-icons/bi"
import { Button } from "@julseb-lib/react"

export function BackButton({ href }: IBackButton) {
	return (
		<Button
			variant="transparent"
			className="p-0"
			element={Link}
			// @ts-ignore
			href={href}
		>
			<BiChevronLeft />
			Back to list
		</Button>
	)
}

interface IBackButton {
	href: string
}
