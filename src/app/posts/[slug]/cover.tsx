"use client"
import { Text, Tag, Flexbox } from "@julseb-lib/react"
import { LazyImage } from "components"
import type { Post } from "types"

export function PostCover({ post }: IPostCover) {
	return (
		<section className="relative flex flex-col justify-end gap-4 mx-auto mt-21 p-6 rounded-2xl w-[calc(100dvw-96px)] h-[calc(100svh-84px-24px)] overflow-hidden">
			<LazyImage
				src={post.cover}
				alt={post.coverAlt}
				width={5000}
				height={5000}
				className="top-0 left-0 z-0 absolute size-full object-cover"
			/>

			<Text
				tag="h1"
				className="z-10 relative bg-white px-4 py-2 rounded-xl w-fit"
			>
				{post.title}
			</Text>

			<Text
				tag="h2"
				className="z-10 relative bg-white px-4 py-1 rounded-xl w-fit"
			>
				{post.category.name}
			</Text>

			<Flexbox gap="xs" className="z-10 relative">
				{post.tags.map(tag => (
					<Tag key={tag}>{tag}</Tag>
				))}
			</Flexbox>
		</section>
	)
}

interface IPostCover {
	post: Post
}
