"use client"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Text } from "@julseb-lib/react"
import { PostsList, ErrorMessage } from "components"
import { postService } from "api"
import type {
	IErrorMessage,
	Post,
	ServerPagination,
	ResponseInfinitePosts,
} from "types"

export function SearchResults() {
	const searchParams = useSearchParams()
	const search = searchParams.get("search") ?? ""

	const [posts, setPosts] = useState<Array<Post>>([])
	const [pagination, setPagination] = useState<ServerPagination>()
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		postService
			.allPosts({ page: 1, limit: 20, search })
			.then(res => {
				setPosts((res.data as ResponseInfinitePosts).posts || [])
				setPagination((res.data as ResponseInfinitePosts).pagination)
			})
			.catch(err => {
				console.error("Search API error:", err)
				setErrorMessage(err?.response?.data?.message)
			})
	}, [search])

	return (
		<>
			<Text tag="h1">Search results for "{search}"</Text>

			<Text>Found {posts?.length || 0} posts</Text>

			{posts?.length > 0 && pagination ? (
				<>
					<Text>Rendering PostsList with {posts.length} posts</Text>
					<PostsList posts={posts} pagination={pagination} />
				</>
			) : (
				<Text>Your search did not return any result.</Text>
			)}

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}
