"use client"
import { useRouter } from "next/navigation"
import { BiChevronLeft } from "react-icons/bi"
import { Button } from "@julseb-lib/react"

export function BackButton() {
	const router = useRouter()

	return (
		<Button
			variant="transparent"
			className="p-0"
			onClick={() => router.back()}
			role="link"
		>
			<BiChevronLeft />
			Back to previous page
		</Button>
	)
}
