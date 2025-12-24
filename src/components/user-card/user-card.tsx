"use client"
import Link from "next/link"
import { Text, clsx } from "@julseb-lib/react"
import { Avatar } from "components/avatar"
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
			<Avatar user={user} />

			<Text textAlign="center">{user.fullName}</Text>
		</Link>
	)
}
