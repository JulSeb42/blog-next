"use client"
import { PageLoading, Main, Wrapper, clsx } from "@julseb-lib/react"
import { ProtectedRoute } from "../protected-route"
import { AdminNav } from "./admin-nav"
import type { IAdminLayout } from "./types"

export default function AdminPage({
	children,
	isLoading,
	mainSize = "large",
}: IAdminLayout) {
	if (isLoading) return <PageLoading loaderVariant={3} />

	return (
		<ProtectedRoute>
			<AdminNav />

			<Wrapper
				className={clsx(
					"bg-gray-100 mx-[calc(auto+12px)] ml-10.5 py-12 w-[calc(100%-42px)]",
				)}
			>
				<Main
					className={clsx("relative bg-transparent w-full")}
					size={mainSize}
				>
					{children}
				</Main>
			</Wrapper>
		</ProtectedRoute>
	)
}
