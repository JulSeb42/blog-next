"use client"
import { Flexbox, Text, clsx, convertDateShort } from "@julseb-lib/react"
import type { ICommentCard } from "./types"

export default function CommentCard({ comment }: ICommentCard) {
	return (
		<Flexbox
			flexDirection="col"
			gap="xs"
			className={clsx(
				"p-4 border border-gray-200 rounded-2xl",
				"comment-card",
			)}
		>
			<Flexbox gap="xs" alignItems="center">
				<Text tag="strong">{comment.author}</Text>
				<Text tag="small" color="gray">
					{convertDateShort(comment.createdAt)}
				</Text>
			</Flexbox>

			<Text>{comment.body}</Text>
		</Flexbox>
	)
}
