import { http } from "./http-common"
import { generateServerRoute } from "utils"
import type { SERVER_PATHS } from "./server-paths"
import type {
	ApiResponse,
	Category,
	EditCategoryFormData,
	NewCategoryFormData,
} from "types"

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

	newCategory = async (data: NewCategoryFormData) =>
		await http.post(generateRoute("NEW_CATEGORY"), data)

	editCategory = async (id: string, data: EditCategoryFormData) =>
		await http.put(generateRoute("EDIT_CATEGORY", id), data)

	deleteCategory = async (id: string) =>
		await http.delete(generateRoute("DELETE_CATEGORY", id))

	/* Prepend route - DO NOT REMOVE */
}

export const categoryService = new CategoryService()
