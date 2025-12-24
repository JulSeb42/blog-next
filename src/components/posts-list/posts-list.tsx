"use client"
import { useState, useEffect, useCallback } from "react"
import { Text, Flexbox, deleteDuplicates } from "@julseb-lib/react"
import { PostCard, PostCardSkeleton } from "components/post-card"
import { ErrorMessage } from "components/error-message"
import { postService } from "api"
import type { IPostsList } from "./types"
import type { Post, ServerPagination } from "types"

export default function PostsList({
	posts: initialPosts,
	pagination: initialPagination,
}: IPostsList) {
	const [posts, setPosts] = useState(initialPosts)
	const [pagination, setPagination] = useState(initialPagination)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const loadMorePosts = useCallback(async () => {
		if (loading || !pagination.hasMore) return

		setLoading(true)
		setErrorMessage(null)

		try {
			setTimeout(async () => {
				const nextPage =
					pagination.currentPage === 0
						? 2
						: pagination.currentPage + 1
				const response = await postService.allPosts({
					page: nextPage,
					limit: 12,
				})
				const { posts: newPosts, pagination: newPagination } =
					response.data as {
						posts: Array<Post>
						pagination: ServerPagination
					}

				setPosts(prev => {
					const uniqueNewPosts = deleteDuplicates(newPosts)
					return [...prev, ...uniqueNewPosts]
				})
				setPagination(newPagination)
				setLoading(false)
			}, 2000)
		} catch (err) {
			console.error("Error loading more posts: ", err)
			setErrorMessage("Failed to load more posts")
		}
	}, [loading, pagination])

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null

		const observer = new IntersectionObserver(
			entries => {
				const target = entries[0]
				if (target.isIntersecting && pagination.hasMore && !loading) {
					if (timeoutId) clearTimeout(timeoutId)
					timeoutId = setTimeout(() => loadMorePosts(), 500)
				}
			},
			{
				threshold: 0.1,
				rootMargin: "100px",
			},
		)

		const sentinel = document.getElementById("load-more-sentinel")

		if (sentinel) observer.observe(sentinel)

		return () => {
			if (timeoutId) clearTimeout(timeoutId)
			if (sentinel) observer.unobserve(sentinel)
		}
	}, [loadMorePosts, pagination.hasMore, loading])

	return (
		<>
			{posts.length > 0 ? (
				<>
					<Flexbox flexDirection="col" gap="md">
						{deleteDuplicates(posts).map(post => (
							<PostCard post={post} key={post._id} />
						))}

						{loading && <PostCardSkeleton />}
					</Flexbox>

					{pagination.hasMore && (
						<span id="load-more-sentinel" style={{ height: 1 }} />
					)}
				</>
			) : (
				<Text>No post yet.</Text>
			)}

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}
