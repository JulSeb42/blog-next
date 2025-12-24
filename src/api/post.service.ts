import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type { ApiResponse, Post, ResponseInfinitePosts } from "types"

type PATHS = keyof typeof SERVER_PATHS.POST

const generateRoute = (route: Exclude<PATHS, "ROOT">, id?: string) =>
	generateServerRoute("POST", route, id)

class PostService {
	allPosts = async ({
		page,
		limit = 20,
		search,
		category,
		author,
		draft,
	}: {
		page?: number
		limit?: number
		search?: string
		category?: string
		author?: string
		draft?: string
	} = {}): ApiResponse<ResponseInfinitePosts | Array<Post>> => {
		if (page) {
			const params = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
			})

			if (search) params.append("search", search)
			if (category && category !== "none")
				params.append("category", category)
			if (author && author !== "none") params.append("author", author)
			if (draft && draft !== "none") params.append("draft", draft)

			return await http.get(
				`${generateRoute("ALL_POSTS")}?${params.toString()}`,
			)
		}

		return await http.get(generateRoute("ALL_POSTS"))
	}

	featuredPosts = async (): ApiResponse<Array<Post>> =>
		await http.get(generateRoute("FEATURED_POSTS"))

	post = async (id: string): ApiResponse<Post> =>
		await http.get(generateRoute("POST", id))

	postSlug = async (slug: string): ApiResponse<Post> =>
		await http.get(generateRoute("POST_SLUG", slug))

	deletePost = async (id: string): ApiResponse<string> =>
		await http.delete(generateRoute("DELETE_POST", id))

	/* Prepend route - DO NOT REMOVE */
}

export const postService = new PostService()
