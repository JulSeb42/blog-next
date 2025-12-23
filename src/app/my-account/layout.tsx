"use client"
import { redirect } from "next/navigation"
import { useAuth } from "context"

export default function Layout({
	children,
}: Readonly<{
	children: Children
}>) {
	const { user } = useAuth()

	if (user?.role === "admin") return redirect("/admin")

	return children
}
