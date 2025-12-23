"use client"
import { Avatar, Text, getInitials, clsx } from "@julseb-lib/react"
import { LazyImage } from "components/lazy-image"
import type { IUserHeader } from "./types"

export default function UserHeader({ user, isPublic }: IUserHeader) {
	return (
		<div className={clsx("flex items-center gap-2", "user-header")}>
			<Avatar>
				{user?.avatar ? (
					<LazyImage
						src={user?.avatar}
						alt={`Avatar ${user?.fullName}`}
						width={64}
						height={64}
						skeletonAnimation="shine"
						skeletonClasses="w-full h-full"
						key={user.avatar}
					/>
				) : (
					getInitials(user?.fullName ?? "")
				)}
			</Avatar>

			<Text tag="h1">
				{!isPublic ? "Hello " : ""}
				{user?.fullName}
			</Text>
		</div>
	)
}
