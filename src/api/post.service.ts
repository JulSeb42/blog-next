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
	}: {
		page?: number
		limit?: number
		search?: string
		category?: string
	} = {}): ApiResponse<ResponseInfinitePosts | Array<Post>> => {
		if (page) {
			const params = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
			})

			if (search) params.append("search", search)
			if (category) params.append("category", category)

			return await http.get(
				`${generateRoute("ALL_POSTS")}?${params.toString()}`,
			)
		}

		return await http.get(generateRoute("ALL_POSTS"))
	}

	featuredPosts = async (): ApiResponse<Array<Post>> =>
		await http.get(generateRoute("FEATURED_POSTS"))

	/* Prepend route - DO NOT REMOVE */
}

export const postService = new PostService()
