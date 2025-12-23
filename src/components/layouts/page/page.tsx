"use client"
import { Fragment, useState, useEffect } from "react"
import { redirect, usePathname } from "next/navigation"
import { PageLayout, PageLoading } from "@julseb-lib/react"
import { AnonRoute } from "../anon-route"
import { ProtectedRoute } from "../protected-route"
import { Header } from "../header"
import { userService } from "api"
import type { ILibPageLayout } from "@julseb-lib/react/component-props"
import type { LibMainSize } from "@julseb-lib/react/types"
import type { PageType, User } from "types"

export default function Page({
	type,
	children,
	isLoading,
	noWrapper,
	noMain,
	mainSize,
	...rest
}: IPage) {
	const [users, setUsers] = useState<Array<User>>([])
	const [loading, setLoading] = useState(true)
	const pathname = usePathname()

	useEffect(() => {
		userService
			.allUsers()
			.then(res => setUsers((res.data as any).users as Array<User>))
			.catch(err => console.error(err))
			.finally(() => setLoading(false))
	}, [])

	const Element =
		type === "protected"
			? ProtectedRoute
			: type === "anon"
				? AnonRoute
				: Fragment

	if (isLoading || loading) return <PageLoading />

	if (!users.length && pathname !== "/signup") return redirect("/signup")

	return (
		<Element>
			<PageLayout
				header={users.length && <Header />}
				noMain={noMain as any}
				noWrapper={noWrapper as any}
				wrapperProps={{
					className: "mt-21 min-h-fit! h-fit! bg-transparent",
					...rest.wrapperProps,
				}}
				mainProps={{ className: "py-0 bg-transparent", size: mainSize }}
				{...rest}
			>
				{children}
			</PageLayout>
		</Element>
	)
}

type IPage = ILibPageLayout & {
	type: PageType
	isLoading?: boolean
	mainSize?: LibMainSize
}
