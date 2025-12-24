import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type {
	ApiResponse,
	Comment,
	NewCommentFormData,
	ServerPagination,
} from "types"

type PATHS = keyof typeof SERVER_PATHS.COMMENT

const generateRoute = (route: Exclude<PATHS, "ROOT">, id?: string) =>
	generateServerRoute("COMMENT", route, id)

class CommentService {
	allComments = async ({
		page,
		limit = 10,
		post,
	}: {
		page?: number
		limit?: number
		post?: string
	} = {}): ApiResponse<{
		comments: Array<Comment>
		pagination: ServerPagination
	}> => {
		if (page) {
			const params = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
			})

			if (post) params.append("post", post)

			return await http.get(
				`${generateRoute("ALL_COMMENTS")}?${params.toString()}`,
			)
		}

		return await http.get(generateRoute("ALL_COMMENTS"))
	}

	newComment = async (data: NewCommentFormData) =>
		await http.post(generateRoute("NEW_COMMENT"), data)

	deleteComment = async (id: string): ApiResponse<string> =>
		await http.delete(generateRoute("DELETE_COMMENT", id))

	/* Prepend route - DO NOT REMOVE */
}

export const commentService = new CommentService()
