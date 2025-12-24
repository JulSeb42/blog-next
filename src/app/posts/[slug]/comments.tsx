"use client"
import { useState, useEffect, useCallback } from "react"
import { deleteDuplicates, Text } from "@julseb-lib/react"
import { CommentCard, ErrorMessage, CommentCardSkeleton } from "components"
import { NewCommentForm } from "./new-comment-form"
import type { Comment, ServerPagination } from "types"
import { commentService } from "api"

export function PostComments({
	comments: initialComments,
	pagination: initialPagination,
	slug,
	postId,
}: IPostComments) {
	const [comments, setComments] = useState(initialComments)
	const [pagination, setPagination] = useState(initialPagination)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const loadMoreComments = useCallback(async () => {
		if (loading || !pagination.hasMore) return

		setLoading(true)
		setErrorMessage(null)

		try {
			setTimeout(async () => {
				const nextPage =
					pagination.currentPage === 0
						? 2
						: pagination.currentPage + 1
				const response = await commentService.allComments({
					page: nextPage,
					limit: 12,
					post: slug,
				})
				const { comments: newComments, pagination: newPagination } =
					response.data as {
						comments: Array<Comment>
						pagination: ServerPagination
					}

				setComments(prev => {
					const uniqueNewComments = deleteDuplicates(newComments)
					return [...prev, ...uniqueNewComments]
				})
				setPagination(newPagination)
				setLoading(false)
			}, 2000)
		} catch (err) {
			console.error("Error loading more comments: ", err)
			setErrorMessage("Failed to load more comments")
		}
	}, [loading, pagination])

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null

		const observer = new IntersectionObserver(
			entries => {
				const target = entries[0]
				if (target.isIntersecting && pagination.hasMore && !loading) {
					if (timeoutId) clearTimeout(timeoutId)
					timeoutId = setTimeout(() => loadMoreComments(), 500)
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
	}, [loadMoreComments, pagination?.hasMore, loading])

	return (
		<section className="flex flex-col gap-4">
			<Text tag="h3">Comments</Text>

			<NewCommentForm setComments={setComments} postId={postId} />

			{comments.length ? (
				<>
					{comments.map(comment => (
						<CommentCard comment={comment} key={comment._id} />
					))}

					{loading && <CommentCardSkeleton />}

					{pagination.hasMore && (
						<span id="load-more-sentinel" style={{ height: 1 }} />
					)}
				</>
			) : (
				<Text>No comment yet.</Text>
			)}

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</section>
	)
}

interface IPostComments {
	comments: Array<Comment>
	pagination: ServerPagination
	slug: string
	postId: string
}
