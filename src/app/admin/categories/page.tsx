import type { Metadata } from "next"
import { AdminPage } from "components"
import { CategoriesList } from "./categories-list"

export const metadata: Metadata = {
	title: "Categories",
}

export default async function AdminCategories() {
	return (
		<AdminPage>
			<CategoriesList />
		</AdminPage>
	)
}
