import type { Category } from "./Category.type"
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
	createdAt: Date
	updatedAt: Date
}

export type ResponseInfinitePosts = {
	posts: Array<Post>
	pagination: ServerPagination
}

export type NewPostFormData = Pick<
	Post,
	| "title"
	| "slug"
	| "cover"
	| "coverAlt"
	| "featured"
	| "body"
	| "tags"
	| "draft"
	| "metaDescription"
	| "keywords"
	| "category"
	| "author"
>

export type EditPostFormData = Pick<
	NewPostFormData,
	| "title"
	| "slug"
	| "cover"
	| "coverAlt"
	| "featured"
	| "body"
	| "tags"
	| "draft"
	| "metaDescription"
	| "keywords"
	| "category"
>
