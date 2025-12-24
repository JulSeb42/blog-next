"use client"
import Link from "next/link"
import { Text, Button } from "@julseb-lib/react"
import { AdminIsland } from "components"
import { useAuth } from "context"

export function AdminHeader() {
	const { user } = useAuth()

	return (
		<AdminIsland
			justifyContent="space-between"
			alignItems="center"
			gap="xs"
		>
			<Text tag="h1">Hello {user?.fullName}</Text>
			<Button
				className="self-center"
				element={Link}
				// @ts-ignore
				href={`/admin/posts/new-post`}
			>
				New post
			</Button>
		</AdminIsland>
	)
}
