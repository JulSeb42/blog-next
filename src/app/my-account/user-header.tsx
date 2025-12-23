"use client"
import { Text } from "@julseb-lib/react"
import { UserHeader as Header } from "components"
import { useAuth } from "context"

export function UserHeader() {
	const { user } = useAuth()

	return (
		<>
			<Header user={user} />

			{!user.verified && <Text>Your account is not verified.</Text>}
		</>
	)
}
