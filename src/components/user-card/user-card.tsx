"use client"
import Link from "next/link"
import { Text, Avatar, getInitials, clsx } from "@julseb-lib/react"
import { LazyImage } from "components/lazy-image"
import type { IUserCard } from "./types"

export default function UserCard({ user }: IUserCard) {
	return (
		<Link
			href={`/users/${user._id}`}
			className={clsx(
				"flex flex-col items-center gap-2 p-2 border border-gray-200 rounded-lg",
				"hover:scale-105",
			)}
		>
			<Avatar>
				{user.avatar ? (
					<LazyImage
						src={user.avatar}
						alt={`Avatar ${user.fullName}`}
						className="w-full h-full object-cover"
						skeletonAnimation="shine"
						skeletonClasses="w-full h-full"
						width={500}
						height={500}
					/>
				) : (
					getInitials(user.fullName)
				)}
			</Avatar>

			<Text textAlign="center">{user.fullName}</Text>
		</Link>
	)
}
