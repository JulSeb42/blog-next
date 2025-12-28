"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import {
	Flexbox,
	Text,
	SkeletonCard,
	Skeleton,
	clsx,
	toTitleCase,
} from "@julseb-lib/react"
import { ErrorMessage, LazyImage } from "components"
import { postService } from "api"
import type { IErrorMessage, Post } from "types"

export function FeaturedPosts() {
	const [posts, setPosts] = useState<Array<Post>>([])
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		postService
			.featuredPosts()
			.then(res => setPosts(res.data.slice(0, 4)))
			.catch(err => {
				console.error(err)
				setErrorMessage(err?.response?.data?.message)
			})
			.finally(() => setIsLoading(false))
	}, [])

	if (isLoading)
		return (
			<section
				className={clsx(
					"gap-4 grid md:grid-cols-2 mt-21 p-4 md:h-[calc(100svh-84px-48px)]",
				)}
			>
				<FeaturedPostSkeleton fullHeight />

				<Flexbox
					flexDirection="col"
					alignItems="stretch"
					justifyContent="stretch"
					gap="md"
				>
					<FeaturedPostSkeleton />
					<FeaturedPostSkeleton />
					<FeaturedPostSkeleton />
				</Flexbox>
			</section>
		)

	if (errorMessage) return <ErrorMessage>{errorMessage}</ErrorMessage>

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

function FeaturedPostSkeleton({ fullHeight }: { fullHeight?: boolean }) {
	if (fullHeight)
		return (
			<SkeletonCard
				className="relative flex items-end bg-gray-200 p-8 rounded-2xl w-full h-full"
				isShiny
			>
				<Skeleton className="relative bg-gray-300 w-[70%] h-12" />
			</SkeletonCard>
		)

	// <Link
	// 	href={`/posts/${post.slug}`}
	// 	className={clsx(
	// 		"relative flex items-end p-8 rounded-2xl h-full overflow-hidden hover:[&_img]:scale-105",
	// 	)}
	// 	key={post._id}
	// >
	// 	<LazyImage
	// 		src={post.cover}
	// 		alt={post.coverAlt}
	// 		width={4000}
	// 		height={4000}
	// 		className="top-0 left-0 z-0 absolute size-full object-cover transition-all duration-200 ease-in"
	// 	/>

	// 	<div className="z-10 relative bg-background p-2 rounded-xl w-fit">
	// 		<Text tag="h2" element="h4">
	// 			{toTitleCase(post.title)}
	// 		</Text>
	// 	</div>
	// </Link>

	return (
		<SkeletonCard
			className="relative flex items-end bg-gray-200 p-8 rounded-2xl h-full"
			isShiny
		>
			<Skeleton className="relative bg-gray-300 w-[70%] h-12" />
		</SkeletonCard>
	)
}
