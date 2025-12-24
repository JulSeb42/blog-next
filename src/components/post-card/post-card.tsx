"use client"
import Link from "next/link"
import {
	Flexbox,
	Text,
	Tag,
	MarkdownContainer,
	clsx,
	toTitleCase,
	convertDateShort,
} from "@julseb-lib/react"
import { LazyImage } from "components/lazy-image"
import type { IPostCard } from "./types"

export default function PostCard({ post }: IPostCard) {
	return (
		<Link
			href={`/posts/${post.slug}`}
			className={clsx(
				"flex justify-between items-end p-6 border border-gray-200 rounded-2xl w-full transition-all duration-200 ease-in",
				"hover:[&_img]:scale-105 hover:border-primary-500",
				"post-card",
			)}
		>
			<Flexbox flexDirection="col" gap="xs">
				<Text tag="small">{convertDateShort(post.updatedAt)}</Text>

				<Flexbox gap="xs">
					{post.tags.map(tag => (
						<Tag key={tag} className="text-xs">
							{tag}
						</Tag>
					))}
				</Flexbox>

				<Text tag="h4" element="h5">
					{toTitleCase(post.title)}
				</Text>

				<MarkdownContainer>{post.metaDescription}</MarkdownContainer>
			</Flexbox>

			<Flexbox
				flexDirection="col"
				justifyContent="end"
				alignItems="end"
				className="w-1/4"
				gap="xs"
			>
				{post.featured && (
					<Tag className="self-end bg-primary-50 text-primary-500 text-xs">
						Featured
					</Tag>
				)}

				<div className="rounded-xl w-full h-25 overflow-hidden">
					<LazyImage
						src={post.cover}
						alt={post.coverAlt}
						width={500}
						height={500}
						className="size-full object-cover transition-all duration-200 ease-in"
					/>
				</div>
			</Flexbox>
		</Link>
	)
}
