"use client"
import { useState, useEffect, Fragment } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { BiEdit, BiShow, BiTrash } from "react-icons/bi"
import {
	Flexbox,
	ButtonIcon,
	Modal,
	Alert,
	Text,
	Button,
	Hr,
	useDebounce,
	disableScroll,
	enableScroll,
	toast,
} from "@julseb-lib/react"
import { Pagination, AdminIsland, ErrorMessage } from "components"
import { SearchPosts } from "./search-posts"
import { postService } from "api"
import { useModalOpen } from "context"
import type { IErrorMessage, Post, ServerPagination } from "types"

export function AdminPostsList() {
	const searchParams = useSearchParams()
	const currentPage =
		Number(searchParams.get("page")) === 0
			? 1
			: (Number(searchParams.get("page")) ?? 1)

	const [page, setPage] = useState(currentPage)

	const [filters, setFilters] = useState({
		search: "",
		category: "none",
		author: "none",
		draft: "none",
	})
	const [posts, setPosts] = useState<Array<Post>>([])
	const [pagination, setPagination] = useState<ServerPagination>()
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	const debouncedSearch = useDebounce(filters.search, 500)

	useEffect(() => {
		postService
			.allPosts({
				page: page === 0 ? 1 : page,
				limit: 10,
				search: debouncedSearch,
				category:
					filters.category !== "none" ? filters.category : undefined,
				author: filters.author !== "none" ? filters.author : undefined,
				draft: filters.draft !== "none" ? filters.draft : undefined,
			})
			.then(res => {
				setPosts((res.data as any).posts)
				setPagination((res.data as any).pagination)
			})
			.catch(err => setErrorMessage(err?.response?.data?.message))
			.finally(() => setIsLoading(false))
	}, [debouncedSearch, filters.category, filters.author, filters.draft, page])

	return (
		<>
			<SearchPosts
				inputs={filters}
				setInputs={setFilters}
				setPage={setPage}
			/>

			<AdminIsland flexDirection="col" gap="sm">
				{isLoading ? (
					<></>
				) : posts?.length ? (
					posts.map((post, i) => (
						<Fragment key={post._id}>
							<PostLine post={post} setPosts={setPosts} />

							{i !== posts.length - 1 && <Hr />}
						</Fragment>
					))
				) : (
					<Text>Your search did not return any result.</Text>
				)}

				<ErrorMessage>{errorMessage}</ErrorMessage>
			</AdminIsland>

			{pagination?.totalPages && pagination.totalPages > 1 ? (
				<AdminIsland>
					<Pagination
						page={page}
						setPage={setPage}
						totalPages={pagination?.totalPages ?? 1}
					/>
				</AdminIsland>
			) : null}
		</>
	)
}

function PostLine({
	post,
	setPosts,
}: {
	post: Post
	setPosts: DispatchState<Array<Post>>
}) {
	const { setHasModalOpen } = useModalOpen()

	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (isOpen) {
			disableScroll()
			setHasModalOpen(true)
		} else {
			enableScroll()
			setHasModalOpen(false)
		}
	}, [isOpen])

	const handleDelete = () => {
		postService
			.deletePost(post._id)
			.then(() => {
				setPosts(prev => prev.filter(p => p._id !== post._id))
				toast.success("Post has been deleted")
			})
			.catch(err => {
				console.error(err)
				toast.error("An error occurred")
			})
			.finally(() => {
				setIsOpen(false)
				setHasModalOpen(false)
				enableScroll()
			})
	}

	return (
		<>
			<Flexbox key={post._id} justifyContent="space-between" gap="xs">
				<Link
					href={`/admin/posts/${post._id}`}
					className="font-bold text-primary-500 hover:text-primary-300 active:text-primary-600"
				>
					{post.title}
				</Link>

				<Flexbox gap="xs">
					<ButtonIcon
						icon={<BiShow />}
						className="size-6"
						variant="ghost"
						element={Link}
						// @ts-ignore
						href={`/posts/${post.slug}`}
					/>

					<ButtonIcon
						icon={<BiEdit />}
						className="size-6"
						variant="ghost"
						element={Link}
						// @ts-ignore
						href={`/admin/posts/${post._id}`}
					/>

					<ButtonIcon
						icon={<BiTrash />}
						className="size-6"
						variant="ghost"
						color="danger"
						onClick={() => setIsOpen(true)}
					/>
				</Flexbox>
			</Flexbox>

			<Modal isOpen={isOpen} setIsOpen={setIsOpen} hideCloseButton>
				<Alert color="danger">
					<Text>Are you sure you want to delete this post?</Text>

					<Flexbox gap="xs">
						<Button color="danger" onClick={handleDelete}>
							Yes, delete it
						</Button>
						<Button
							color="danger"
							variant="transparent"
							onClick={() => setIsOpen(false)}
						>
							No, cancel
						</Button>
					</Flexbox>
				</Alert>
			</Modal>
		</>
	)
}
