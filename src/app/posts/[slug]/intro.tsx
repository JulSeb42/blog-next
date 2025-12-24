"use client"
import { Text, convertDateShort } from "@julseb-lib/react"
import type { Post } from "types"

export function PostIntro({ post }: IPostIntro) {
	return (
		<Text>
			<Text tag="strong">
				Posted on {convertDateShort(post.createdAt)}
				{post.updatedAt &&
					post.updatedAt !== post.createdAt &&
					`, edited on ${convertDateShort(post.updatedAt)}`}
			</Text>
		</Text>
	)
}

interface IPostIntro {
	post: Post
}
