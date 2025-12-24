"use client"
import { Text, clsx } from "@julseb-lib/react"
import { Avatar } from "components/avatar"
import type { IUserHeader } from "./types"

export default function UserHeader({ user, isPublic }: IUserHeader) {
	return (
		<div className={clsx("flex items-center gap-2", "user-header")}>
			<Avatar user={user} className="size-16" />

			<Text tag="h1">
				{!isPublic ? "Hello " : ""}
				{user?.fullName}
			</Text>
		</div>
	)
}
