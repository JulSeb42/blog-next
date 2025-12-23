"use client"
import { Text } from "@julseb-lib/react"
import { AdminIsland } from "components"
import { useAuth } from "context"

export function AdminHeader() {
	const { user } = useAuth()

	return (
		<AdminIsland>
			<Text tag="h1">Hello {user?.fullName}</Text>
		</AdminIsland>
	)
}
