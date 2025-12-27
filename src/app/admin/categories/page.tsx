import type { Metadata } from "next"
import { AdminPage } from "components"
import { CategoriesList } from "./categories-list"
import { categoryService } from "api"
import type { Category } from "types"

async function getCategories(): Promise<Array<Category>> {
	return await categoryService
		.allCategories()
		.then(res => res.data)
		.catch(err => err)
}

export const metadata: Metadata = {
	title: "Categories",
}

export default async function AdminCategories() {
	const categories = await getCategories()

	return (
		<AdminPage>
			<CategoriesList categories={categories} />
		</AdminPage>
	)
}
