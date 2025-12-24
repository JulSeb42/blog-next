"use client"
import Link from "next/link"
import { BiChevronRight } from "react-icons/bi"
import { Text, Flexbox, clsx } from "@julseb-lib/react"
import { Avatar } from "components/avatar"
import type { IAuthorCard } from "./types"

export default function AuthorCard({ author }: IAuthorCard) {
	return (
		<Link
			href={`/authors/${author.slug}`}
			className={clsx(
				"flex flex-col gap-2 p-4 border border-gray-200 rounded-2xl",
				"hover:border-primary-500",
				"author-card",
			)}
		>
			<Flexbox alignItems="center" gap="xs">
				<Avatar user={author} />
				<Text tag="h4">{author.fullName}</Text>
			</Flexbox>

			<Text>{author.bio}</Text>

			<Text className="flex items-center gap-2 font-bold text-primary-500">
				See their post <BiChevronRight />
			</Text>
		</Link>
	)
}
