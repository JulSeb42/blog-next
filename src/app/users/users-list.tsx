"use client"
import { useState, useEffect, useCallback } from "react"
import { Text, Grid, deleteDuplicates } from "@julseb-lib/react"
import { UserCard, UserCardSkeleton, ErrorMessage } from "components"
import { userService } from "api"
import type { InfinitePagination, User } from "types"

export function UsersList({ initialUsers, initialPagination }: IUsersList) {
	const [users, setUsers] = useState<Array<User>>(initialUsers)
	const [pagination, setPagination] = useState(initialPagination)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const loadMoreUsers = useCallback(async () => {
		if (loading || !pagination.hasMore) {
			return
		}

		setLoading(true)
		setError(null)

		try {
			setTimeout(async () => {
				const nextPage = pagination.currentPage + 1
				const response = await userService.allUsers({
					page: nextPage,
					limit: 12,
				})
				const { users: newUsers, pagination: newPagination } =
					response.data as {
						users: Array<User>
						pagination: InfinitePagination
					}

				setUsers(prevUsers => {
					const uniqueNewUsers = deleteDuplicates(newUsers)
					return [...prevUsers, ...uniqueNewUsers]
				})
				setPagination(newPagination)
				setLoading(false)
			}, 2000)
		} catch (err) {
			console.error("Error loading more users:", err)
			setError("Failed to load more users")
		}
	}, [loading, pagination])

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null
		const observer = new IntersectionObserver(
			entries => {
				const target = entries[0]
				if (target.isIntersecting && pagination.hasMore && !loading) {
					if (timeoutId) clearTimeout(timeoutId)
					timeoutId = setTimeout(() => {
						loadMoreUsers()
					}, 500)
				}
			},
			{
				threshold: 0.1,
				rootMargin: "100px",
			},
		)
		const sentinel = document.getElementById("load-more-sentinel")
		if (sentinel) {
			observer.observe(sentinel)
		}
		return () => {
			if (timeoutId) clearTimeout(timeoutId)
			if (sentinel) {
				observer.unobserve(sentinel)
			}
		}
	}, [loadMoreUsers, pagination.hasMore, loading])

	return (
		<>
			{users.length > 0 ? (
				<>
					<Grid className="grid-cols-2 [&&]:md:grid-cols-4" gap="md">
						{deleteDuplicates(users).map(user => (
							<UserCard user={user} key={user._id} />
						))}

						{loading && <UserCardSkeleton />}
					</Grid>

					{pagination.hasMore && (
						<span id="load-more-sentinel" style={{ height: 1 }} />
					)}
				</>
			) : (
				<Text>No users yet.</Text>
			)}

			<ErrorMessage>{error}</ErrorMessage>
		</>
	)
}

interface IUsersList {
	initialUsers: Array<User>
	initialPagination: {
		currentPage: number
		totalPages: number
		totalUsers: number
		hasMore: boolean
		limit: number
	}
}
