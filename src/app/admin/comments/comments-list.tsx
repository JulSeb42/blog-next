"use client"
import { useState, useEffect, Fragment } from "react"
import {
	useSearchParams,
	useRouter,
	usePathname,
	redirect,
} from "next/navigation"
import Link from "next/link"
import {
	ButtonIcon,
	Flexbox,
	Modal,
	Hr,
	Text,
	Alert,
	Button,
	SkeletonCard,
	Skeleton,
	disableScroll,
	enableScroll,
	toast,
	useDebounce,
} from "@julseb-lib/react"
import { AdminIsland, ErrorMessage, Pagination } from "components"
import { SearchComments } from "./search-comments"
import { commentService } from "api"
import { useAuth, useModalOpen } from "context"
import type { Comment, IErrorMessage, ServerPagination } from "types"
import { BiShow, BiTrash } from "react-icons/bi"

export function CommentsList() {
	const { user } = useAuth()
	const router = useRouter()
	const pathname = usePathname()

	const searchParams = useSearchParams()
	const currentPage =
		(Number(searchParams.get("page")) < 1
			? 1
			: Number(searchParams.get("page"))) ?? 1
	const searchTerms = searchParams.get("search") ?? ""

	const [comments, setComments] = useState<Array<Comment>>([])
	const [pagination, setPagination] = useState<ServerPagination>()
	const [page, setPage] = useState(currentPage)
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	const [search, setSearch] = useState(searchTerms)
	const debouncedSearch = useDebounce(search, 500)

	useEffect(() => {
		commentService
			.allComments({
				page: currentPage,
				limit: 10,
				post: debouncedSearch,
			})
			.then(res => {
				setComments(res.data.comments)
				setPagination(res.data.pagination)
			})
			.catch(err => {
				console.error("API error:", err)
				setErrorMessage(err?.response?.data?.message)
			})
			.finally(() => setIsLoading(false))
	}, [debouncedSearch, currentPage])

	useEffect(() => {
		const params = new URLSearchParams()

		if (page > 1) params.set("page", page.toString())
		if (search) params.set("search", search)

		const newUrl = params.toString()
			? `${pathname}?${params.toString()}`
			: pathname
		router.replace(newUrl)
	}, [page, pathname, router, search])

	if (user?.role === "writer") redirect("/admin")

	return (
		<>
			<SearchComments search={search} setSearch={setSearch} />

			<AdminIsland flexDirection="col" gap="sm">
				{isLoading ? (
					<>
						<CommentLineSkeleton />
						<Hr />
						<CommentLineSkeleton />
						<Hr />
						<CommentLineSkeleton />
					</>
				) : !search.length && !comments?.length ? (
					<Text>No comment yet.</Text>
				) : comments?.length ? (
					comments.map((comment, i) => (
						<Fragment key={comment._id}>
							<CommentLine
								comment={comment}
								setComments={setComments}
							/>

							{i !== comments.length - 1 && <Hr />}
						</Fragment>
					))
				) : (
					<Text>Your search did not return any result.</Text>
				)}
			</AdminIsland>

			{pagination?.totalPages && pagination.totalPages > 1 ? (
				<AdminIsland>
					<Pagination
						page={currentPage}
						setPage={setPage}
						totalPages={pagination?.totalPages ?? 1}
					/>
				</AdminIsland>
			) : null}

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}

function CommentLine({ comment, setComments }: ICommentLine) {
	const { setHasModalOpen } = useModalOpen()

	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		if (isOpen) {
			setHasModalOpen(true)
			disableScroll()
		} else {
			setHasModalOpen(false)
			enableScroll()
		}
	}, [isOpen])

	const handleDelete = () => {
		commentService
			.deleteComment(comment._id)
			.then(() => {
				setComments(prev => prev.filter(c => c._id !== comment._id))
				toast.success("Comment has been deleted")
				setIsOpen(false)
				setHasModalOpen(false)
				enableScroll()
			})
			.catch(err => {
				toast.error("An error occurred")
				console.error(err)
			})
	}

	return (
		<>
			<Flexbox justifyContent="space-between" gap="xs">
				<Text className="w-1/3">{comment.body}</Text>

				<Text className="w-1/3">
					<Link href={comment.post.slug}>{comment.post.title}</Link>
				</Text>

				<Flexbox gap="xs">
					<ButtonIcon
						icon={<BiShow />}
						className="size-6"
						variant="ghost"
						element={Link}
						// @ts-ignore
						href={`/posts/${comment.post.slug}`}
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
					<Text>Are you sure you want to delete this comment?</Text>

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

interface ICommentLine {
	comment: Comment
	setComments: DispatchState<Array<Comment>>
}

function CommentLineSkeleton() {
	return (
		<SkeletonCard isShiny justifyContent="space-between" gap="xs">
			<Skeleton className="w-1/3 h-6" />
			<Skeleton className="w-1/3 h-6" />

			<Flexbox gap="xs">
				<Skeleton className="rounded-full size-6" />
				<Skeleton className="rounded-full size-6" />
				<Skeleton className="rounded-full size-6" />
			</Flexbox>
		</SkeletonCard>
	)
}
