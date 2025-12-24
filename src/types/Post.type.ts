import type { Category } from "./Category.type"
import type { Comment } from "./Comment.type"
import type { ServerPagination } from "./ServerPagination.type"
import type { User } from "./User.type"

export type Post = {
	_id: string
	title: string
	slug: string
	cover: string
	coverAlt: string
	featured: boolean
	body: string
	tags: Array<string>
	draft: boolean
	metaDescription: string
	keywords: Array<string>
	category: Category
	author: User
	comments: Array<Comment>
	createdAt: Date
	updatedAt: Date
}

export type ResponseInfinitePosts = {
	posts: Array<Post>
	pagination: ServerPagination
}
