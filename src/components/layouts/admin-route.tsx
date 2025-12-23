"use client"
import { redirect } from "next/navigation"
import { PageLoading } from "@julseb-lib/react"
import { useAuth } from "context"

export function AdminRoute({ children }: IAdminPage) {
	const { isLoggedIn, user, loading } = useAuth()

	if (loading) return <PageLoading />

	if (!isLoggedIn) return redirect("/login")

	if (isLoggedIn && user?.role !== "admin") return redirect("/my-account")

	return children
}

interface IAdminPage {
	children?: Children
}
