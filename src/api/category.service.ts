import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type { ApiResponse, Category } from "types"

type PATHS = keyof typeof SERVER_PATHS.CATEGORY

const generateRoute = (route: Exclude<PATHS, "ROOT">, id?: string) =>
	generateServerRoute("CATEGORY", route, id)

class CategoryService {
	allCategories = async (): ApiResponse<Array<Category>> =>
		await http.get(generateRoute("ALL_CATEGORIES"))

	category = async (id: string): ApiResponse<Category> =>
		await http.get(generateRoute("CATEGORY", id))

	categorySlug = async (slug: string): ApiResponse<Category> =>
		await http.get(generateRoute("CATEGORY_SLUG", slug))

	/* Prepend route - DO NOT REMOVE */
}

export const categoryService = new CategoryService()
