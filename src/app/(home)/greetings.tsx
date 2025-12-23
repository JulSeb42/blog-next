"use client"
import { Text } from "@julseb-lib/react"
import { useAuth } from "context"

export function Greetings() {
	const { isLoggedIn, user } = useAuth()

	if (!isLoggedIn) return null

	return <Text>Hello {user?.fullName}, you are logged in!</Text>
}
