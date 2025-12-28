"use client"
import { Input } from "@julseb-lib/react"
import { AdminIsland } from "components"

export function SearchComments({ search, setSearch }: ISearchComments) {
	return (
		<AdminIsland className="grid grid-cols-2" element="search">
			<Input
				id="search"
				label="Search by post title"
				value={search}
				onChange={e => setSearch(e.target.value)}
			/>
		</AdminIsland>
	)
}

interface ISearchComments {
	search: string
	setSearch: DispatchState<string>
}
