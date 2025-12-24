import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type { ApiResponse, Comment } from "types"

type PATHS = keyof typeof SERVER_PATHS.COMMENT

const generateRoute = (route: Exclude<PATHS, "ROOT">, id?: string) =>
	generateServerRoute("COMMENT", route, id)

class CommentService {
	allComments = async (): ApiResponse<Array<Comment>> =>
		await http.get(generateRoute("ALL_COMMENTS"))

	/* Prepend route - DO NOT REMOVE */
}

export const commentService = new CommentService()
