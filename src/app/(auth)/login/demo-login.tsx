"use client"
import { useState } from "react"
import { redirect } from "next/navigation"
import { Flexbox, Button } from "@julseb-lib/react"
import { ErrorMessage } from "components"
import { authService } from "api"
import { useAuth } from "context"
import type { IErrorMessage, UserRole } from "types"

export function DemoLogin() {
	const { refetch, setLoading } = useAuth()

	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const handleLogin = async (role: UserRole) => {
		setIsLoading(true)

		return await authService
			.login({
				email: `julien@${role}.com`,
				password: process.env.NEXT_PUBLIC_PW ?? "",
			})
			.then(() => {
				refetch()
				setLoading(true)
			})
			.then(() =>
				setTimeout(
					() => redirect(role === "admin" ? `/admin` : `/my-account`),
					200,
				),
			)
			.catch(err => {
				console.error(err)
				setErrorMessage(err?.response?.data?.message)
			})
			.finally(() => {
				setIsLoading(false)
				setLoading(false)
			})
	}

	if (process.env.NEXT_PUBLIC_ENV !== "local") return null

	return (
		<>
			<Flexbox gap="xs">
				<Button
					onClick={() => handleLogin("user")}
					isLoading={isLoading}
				>
					Login as user
				</Button>
				<Button
					onClick={() => handleLogin("admin")}
					isLoading={isLoading}
				>
					Login as admin
				</Button>
			</Flexbox>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}
