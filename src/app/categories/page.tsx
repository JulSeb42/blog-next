import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
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

export default async function Categories() {
	const categories = await getCategories()

	return (
		<Page type="all">
			<Text tag="h1">Categories</Text>

			<CategoriesList categories={categories} />
		</Page>
	)
}
