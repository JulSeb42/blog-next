"use client"
import { useState, useEffect, useCallback } from "react"
import { Flexbox, Text, deleteDuplicates } from "@julseb-lib/react"
import { AuthorCard, ErrorMessage } from "components"
import { userService } from "api"
import type { ServerPagination, User } from "types"

export function AuthorsList({
	authors: initialAuthors,
	pagination: initialPagination,
}: IAuthorsList) {
	const [authors, setAuthors] = useState(initialAuthors)
	const [pagination, setPagination] = useState(initialPagination)
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const loadMoreAuthors = useCallback(async () => {
		if (loading || !pagination.hasMore) return

		setLoading(true)
		setErrorMessage(null)

		try {
			setTimeout(async () => {
				const nextPage =
					pagination.currentPage === 0
						? 2
						: pagination.currentPage + 1

				const response = await userService.allUsers({
					page: nextPage,
					limit: 12,
				})

				const { users: newUsers, pagination: newPagination } =
					response.data as {
						users: Array<User>
						pagination: ServerPagination
					}

				setAuthors(prev => {
					const uniqueNewAuthors = deleteDuplicates(newUsers)

					return [...prev, ...uniqueNewAuthors]
				})
				setPagination(newPagination)
				setLoading(false)
			}, 2000)
		} catch (err) {
			console.error("Error loading more authors: ", err)
			setErrorMessage("Failed to load more authors")
		}
	}, [loading, pagination])

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null

		const observer = new IntersectionObserver(
			entries => {
				const target = entries[0]

				if (target.isIntersecting && pagination.hasMore && !loading) {
					if (timeoutId) clearTimeout(timeoutId)

					timeoutId = setTimeout(() => loadMoreAuthors(), 500)
				}
			},
			{ threshold: 0.1, rootMargin: "100px" },
		)

		const sentinel = document.getElementById("load-more-sentinel")

		if (sentinel) observer.observe(sentinel)

		return () => {
			if (timeoutId) clearTimeout(timeoutId)
			if (sentinel) observer.unobserve(sentinel)
		}
	}, [loadMoreAuthors, pagination.hasMore, loading])

	return (
		<>
			{authors.length ? (
				<>
					<Flexbox flexDirection="col" gap="md">
						{deleteDuplicates(authors).map(author => (
							<AuthorCard author={author} key={author._id} />
						))}
					</Flexbox>

					{pagination.hasMore && (
						<span id="load-more-sentinel" style={{ height: 1 }} />
					)}
				</>
			) : (
				<Text>No author yet.</Text>
			)}

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}

interface IAuthorsList {
	authors: Array<User>
	pagination: ServerPagination
}
