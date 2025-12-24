"use client"
import { Flexbox, Text } from "@julseb-lib/react"
import { Avatar } from "components"
import type { User } from "types"

export function AuthorHeader({ author }: IAuthorHeader) {
	return (
		<Flexbox
			className="p-4 border border-gray-200 rounded-2xl"
			flexDirection="col"
			gap="xs"
		>
			<Flexbox alignItems="center" gap="xs">
				<Avatar user={author} />
				<Text tag="h1">{author.fullName}'s posts</Text>
			</Flexbox>

			<Text>{author.bio}</Text>
		</Flexbox>
	)
}

interface IAuthorHeader {
	author: User
}
