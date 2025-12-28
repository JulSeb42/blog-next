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
			gap="xs"
			className="md:flex-row flex-col items-start md:items-center gap-2"
		>
			<Text tag="h1">Hello {user?.fullName}</Text>
			<Button
				className="md:self-center"
				element={Link}
				// @ts-ignore
				href={`/admin/posts/new-post`}
			>
				New post
			</Button>
		</AdminIsland>
	)
}
