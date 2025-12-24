import type { Post } from "./Post.type"

export type Comment = {
	_id: string
	post: Post
	author: string
	body: string
	createdAt: Date
}

export type NewCommentFormData = Pick<Comment, "author" | "body"> & {
	post: string
}
