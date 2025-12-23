"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Text } from "@julseb-lib/react"
import { useAuth } from "context"
import { authService } from "api"
import { COMMON_TEXTS } from "data"
import { VerificationSkeleton } from "./verification-skeleton"
import type { IErrorMessage } from "types"

export function VerifyPage() {
	const searchParams = useSearchParams()
	const token = searchParams.get("token")
	const id = searchParams.get("id")

	const { isLoggedIn, user, loading, setLoading } = useAuth()

	const [isLoading, setIsLoading] = useState(true)
	const [isVerified, setIsVerified] = useState(false)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		if (isLoggedIn !== null && isLoading) {
			if (user && user.verified) {
				setIsVerified(true)
				setIsLoading(false)
			}

			if (id && token && isLoggedIn && user) {
				authService
					.verify({
						verifyToken: token,
						_id: id,
						verified: user.verified,
					})
					.then(res => {
						console.log({ res })
						if (res.data.verified) setIsVerified(true)
					})
					.catch(err => {
						console.log({ err })
						setErrorMessage(
							err?.response?.data?.message || err.message,
						)
						console.error(err?.response?.data?.error || err.message)
					})
					.finally(() => {
						setIsLoading(false)
						setLoading(false)
					})
			} else if (!id || !token) {
				if (!id) setErrorMessage("ID is missing")
				if (!token) setErrorMessage("Token is missing")
				setLoading(false)
				setIsLoading(false)
			} else if (!isLoggedIn && !loading) {
				setErrorMessage(COMMON_TEXTS.ERRORS.USER_NOT_LOGGED_IN)
				setIsLoading(false)
			}
		}
	}, [id, isLoggedIn, isLoading, token, user, loading])

	if ((isLoading || loading) && !isVerified) return <VerificationSkeleton />

	if (!isLoggedIn && !loading && !isLoading)
		return (
			<Text>
				You are not logged in! Please log in to verify your account.
			</Text>
		)

	if (!isVerified) return <Text>{errorMessage?.toString()}</Text>

	return (
		<Text>
			Your account is verified! You can now access all the functionalities
			on our website. <Link href="/my-account">Go to your account</Link>.
		</Text>
	)
}
