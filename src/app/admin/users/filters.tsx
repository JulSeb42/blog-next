"use client"
import { Grid, Input } from "@julseb-lib/react"
import { AdminIsland } from "components"

export function UsersFilters({
	search,
	setSearch,
	filter,
	setFilter,
}: IUsersFilters) {
	return (
		<AdminIsland className="gap-3 grid md:grid-cols-2!" element={Grid}>
			<Input
				id="search"
				label="Search by name"
				value={search}
				onChange={e => setSearch(e.target.value)}
				placeholder="Search by name"
			/>

			<Input
				id="filter"
				label="Filter by role"
				value={filter}
				onChange={e => setFilter(e.target.value as UserFilter)}
				type="select"
			>
				<option value="none">None</option>
				<option value="writer">Writer</option>
				<option value="moderator">Moderator</option>
				<option value="admin">Admin</option>
			</Input>
		</AdminIsland>
	)
}

export type UserFilter = "none" | "user" | "admin"

interface IUsersFilters {
	search: string
	setSearch: DispatchState<string>
	filter: UserFilter
	setFilter: DispatchState<UserFilter>
}
