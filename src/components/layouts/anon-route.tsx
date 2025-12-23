"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLoading } from "@julseb-lib/react"
import { useAuth } from "context"

export function AnonRoute({ children }: IAnonPage) {
	const { isLoggedIn, loading } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (!loading && isLoggedIn) {
			router.push("/my-account")
		}
	}, [isLoggedIn, loading, router])

	if (loading) return <PageLoading />

	if (isLoggedIn) return <PageLoading />

	return children
}

interface IAnonPage {
	children?: Children
}
