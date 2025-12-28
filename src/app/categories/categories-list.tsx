"use client"
import { Grid } from "@julseb-lib/react"
import { CategoryCard } from "components"
import type { Category } from "types"

export function CategoriesList({ categories }: ICategoriesList) {
	return (
		<Grid cols={2} gap="md">
			{categories?.map(category => (
				<CategoryCard category={category} key={category._id} />
			))}
		</Grid>
	)
}

interface ICategoriesList {
	categories: Array<Category>
}
