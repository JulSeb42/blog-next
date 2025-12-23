import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type {
	ApiResponse,
	User,
	ResponseInfiniteUsers,
	EditAccountFormData,
	EditPasswordFormData,
} from "types"

type PATHS = keyof typeof SERVER_PATHS.USER

const generateRoute = (
	route: Exclude<PATHS, "ROOT">,
	param?: string | Array<string>,
) => generateServerRoute("USER", route, param)

class UserService {
	allUsers = async ({
		page = 1,
		limit = 20,
		search,
		role,
		fields,
	}: {
		page?: number
		limit?: number
		search?: string
		role?: string
		fields?: string
	}): ApiResponse<ResponseInfiniteUsers | Array<User>> => {
		if (page) {
			const params = new URLSearchParams({
				page: page.toString(),
				limit: limit.toString(),
			})

			if (search) params.append("search", search)
			if (role && role !== "none") params.append("role", role)
			if (fields) params.append("fields", fields)

			return await http.get(
				`${generateRoute("ALL_USERS")}?${params.toString()}`,
			)
		}

		return await http.get(generateRoute("ALL_USERS"))
	}

	getUser = async (id: string): ApiResponse<User> =>
		await http.get(generateRoute("USER", id))

	editAccount = async (
		id: string,
		data: EditAccountFormData,
	): ApiResponse<{ user: User; message: string }> =>
		await http.put(generateRoute("EDIT_ACCOUNT", id), data)

	editPassword = async (
		id: string,
		data: EditPasswordFormData,
	): ApiResponse<{ user: User; message: string }> =>
		await http.put(generateRoute("EDIT_PASSWORD", id), data)

	deleteAccount = async (id: string): ApiResponse<{ message: string }> =>
		await http.delete(generateRoute("DELETE_ACCOUNT", id))

	/* Prepend route - DO NOT REMOVE */
}

export const userService = new UserService()
