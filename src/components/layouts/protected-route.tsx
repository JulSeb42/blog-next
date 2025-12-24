"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { PageLoading } from "@julseb-lib/react"
import { useAuth } from "context"

export function ProtectedRoute({ children }: IProtectedPage) {
	const router = useRouter()
	const { isLoggedIn, loading } = useAuth()

	useEffect(() => {
		if (!loading && !isLoggedIn) {
			router.push("/login")
		}
	}, [isLoggedIn, loading, router])

	if (loading) return <PageLoading loaderVariant={3} />

	if (!isLoggedIn) return <PageLoading loaderVariant={3} />

	return children
}

interface IProtectedPage {
	children?: Children
}
