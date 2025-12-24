import type { Post, ServerPagination } from "types"

export interface IPostsList {
	posts: Array<Post>
	pagination: ServerPagination
}
