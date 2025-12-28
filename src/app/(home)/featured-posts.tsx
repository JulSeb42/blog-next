"use client"
import Link from "next/link"
import { Flexbox, Text, clsx, toTitleCase } from "@julseb-lib/react"
import { LazyImage } from "components"
import type { Post } from "types"

export function FeaturedPosts({ posts }: IFeaturedPosts) {
	return (
		<section
			className={clsx(
				"gap-4 grid md:grid-cols-2 mt-21 p-4 md:h-[calc(100svh-84px-48px)]",
			)}
		>
			<Link
				href={`/posts/${posts[0].slug}`}
				className="relative flex items-end p-8 rounded-2xl w-full h-full overflow-hidden hover:[&_img]:scale-105"
			>
				<LazyImage
					src={posts[0].cover}
					alt={posts[0].coverAlt}
					width={4000}
					height={4000}
					className="top-0 left-0 z-0 absolute size-full object-cover transition-all duration-200 ease-in"
				/>

				<div className="z-10 relative bg-background p-2 rounded-xl w-fit">
					<Text tag="h2" element="h4">
						{toTitleCase(posts[0].title)}
					</Text>
				</div>
			</Link>

			<Flexbox
				flexDirection="col"
				alignItems="stretch"
				justifyContent="stretch"
				gap="md"
			>
				{posts.slice(1, 4).map(post => (
					<Link
						href={`/posts/${post.slug}`}
						className={clsx(
							"relative flex items-end p-8 rounded-2xl h-full overflow-hidden hover:[&_img]:scale-105",
						)}
						key={post._id}
					>
						<LazyImage
							src={post.cover}
							alt={post.coverAlt}
							width={4000}
							height={4000}
							className="top-0 left-0 z-0 absolute size-full object-cover transition-all duration-200 ease-in"
						/>

						<div className="z-10 relative bg-background p-2 rounded-xl w-fit">
							<Text tag="h2" element="h4">
								{toTitleCase(post.title)}
							</Text>
						</div>
					</Link>
				))}
			</Flexbox>
		</section>
	)
}

interface IFeaturedPosts {
	posts: Array<Post>
}
