import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { CategoriesList } from "./categories-list"

export const metadata: Metadata = {
	title: "Categories",
}

export default async function Categories() {
	return (
		<Page type="all">
			<Text tag="h1">Categories</Text>

			<CategoriesList />
		</Page>
	)
}
