"use client"
import { useState, useEffect } from "react"
import { Grid } from "@julseb-lib/react"
import { CategoryCard, ErrorMessage, CategoryCardSkeleton } from "components"
import type { Category, IErrorMessage } from "types"
import { categoryService } from "api"

export function CategoriesList() {
	const [categories, setCategories] = useState<Array<Category>>([])
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	useEffect(() => {
		categoryService
			.allCategories()
			.then(res => setCategories(res.data))
			.catch(err => {
				console.error(err)
				setErrorMessage(err?.response?.data?.message)
			})
			.finally(() => setIsLoading(false))
	}, [])

	if (isLoading)
		return (
			<Grid cols={2} gap="md">
				<CategoryCardSkeleton />
				<CategoryCardSkeleton />
				<CategoryCardSkeleton />
			</Grid>
		)

	return (
		<>
			<Grid cols={2} gap="md">
				{categories?.map(category => (
					<CategoryCard category={category} key={category._id} />
				))}
			</Grid>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}
