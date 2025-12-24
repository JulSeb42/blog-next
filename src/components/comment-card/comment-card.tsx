"use client"
import { useState, useEffect } from "react"
import { BiTrash } from "react-icons/bi"
import {
	Flexbox,
	Text,
	ButtonIcon,
	Modal,
	Alert,
	Button,
	disableScroll,
	enableScroll,
	clsx,
	convertDateShort,
	toast,
} from "@julseb-lib/react"
import { useAuth, useModalOpen } from "context"
import { commentService } from "api"
import type { ICommentCard } from "./types"

export default function CommentCard({ comment, setComments }: ICommentCard) {
	const { isLoggedIn, user } = useAuth()
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
		commentService
			.deleteComment(comment._id)
			.then(() => {
				toast.success("Comment has been deleted successfully")
				setComments(prev => prev.filter(c => c._id !== comment._id))
			})
			.catch(err => {
				console.error(err)
				toast.error("Error while deleting comment")
			})
			.finally(() => setIsOpen(false))
	}

	return (
		<>
			<Flexbox
				flexDirection="col"
				gap="xs"
				className={clsx(
					"p-4 border border-gray-200 rounded-2xl",
					"comment-card",
				)}
			>
				<Flexbox justifyContent="space-between" alignItems="center">
					<Flexbox gap="xs" alignItems="center" className="w-full">
						<Text tag="strong">{comment.author}</Text>
						<Text tag="small" color="gray">
							{convertDateShort(comment.createdAt)}
						</Text>
					</Flexbox>

					{isLoggedIn &&
						(user.role === "moderator" ||
							user.role === "admin") && (
							<ButtonIcon
								icon={<BiTrash />}
								variant="ghost"
								className="justify-self-end size-6"
								color="danger"
								onClick={() => setIsOpen(true)}
							/>
						)}
				</Flexbox>

				<Text>{comment.body}</Text>
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
