"use client"
import { useState, useEffect } from "react"
import { Input } from "@julseb-lib/react"
import { AdminIsland } from "components"
import { categoryService, userService } from "api"
import type { Category, User } from "types"

export function SearchPosts({ inputs, setInputs, setPage }: ISearchPosts) {
	const [categories, setCategories] = useState<Array<Category>>([])
	const [authors, setAuthors] = useState<Array<User>>([])
	const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
	const [isAuthorsLoading, setIsAuthorsLoading] = useState(true)

	useEffect(() => {
		categoryService
			.allCategories()
			.then(res => setCategories(res.data))
			.catch(err => console.error(err))
			.finally(() => setIsCategoriesLoading(false))

		userService
			.allUsers()
			.then(res => setAuthors((res.data as any).users as Array<User>))
			.catch(err => console.error(err))
			.finally(() => setIsAuthorsLoading(false))
	}, [])

	const handleInputs = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setInputs({ ...inputs, [e.target.id]: e.target.value })
		setPage(1)
	}

	return (
		<AdminIsland>
			<search className="gap-4 grid grid-cols-2 w-full">
				<Input
					id="search"
					label="Search by title or tag"
					value={inputs.search}
					onChange={handleInputs}
				/>

				<Input
					id="category"
					label="Filter by category"
					value={inputs.category}
					onChange={handleInputs}
					type="select"
					disabled={isCategoriesLoading}
				>
					<option value="none">None</option>
					{categories?.map(category => (
						<option value={category.slug} key={category._id}>
							{category.name}
						</option>
					))}
				</Input>

				<Input
					id="author"
					label="Filter by author"
					value={inputs.author}
					onChange={handleInputs}
					type="select"
					disabled={isAuthorsLoading}
				>
					<option value="none">None</option>
					{authors.length &&
						authors?.map(author => (
							<option value={author.slug} key={author._id}>
								{author.fullName}
							</option>
						))}
				</Input>

				<Input
					id="draft"
					label="Filter by draft"
					value={inputs.draft}
					onChange={handleInputs}
					type="select"
				>
					<option value="none">None</option>
					<option value="true">Draft</option>
					<option value="false">Published</option>
				</Input>
			</search>
		</AdminIsland>
	)
}

interface ISearchPosts {
	inputs: Inputs
	setInputs: DispatchState<Inputs>
	setPage: DispatchState<number>
}

type Inputs = {
	search: string
	category: string
	author: string
	draft: string
}
