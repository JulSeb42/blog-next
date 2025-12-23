"use client"
import { useState, useEffect } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Text, Grid, useDebounce } from "@julseb-lib/react"
import { UserCardAdmin, Pagination, AdminIsland } from "components"
import { UsersFilters, type UserFilter } from "./filters"
import type { ResponseInfiniteUsers } from "types"

export function UsersList({
	initialData,
	initialSearch = "",
	initialRole = "none",
}: IUsersList) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const [users, setUsers] = useState(initialData.users)
	const [pagination, setPagination] = useState(initialData.pagination)
	const [search, setSearch] = useState(initialSearch)
	const [filter, setFilter] = useState<UserFilter>(initialRole as UserFilter)

	const debouncedSearch = useDebounce(search, 500)

	useEffect(() => {
		setUsers(initialData.users)
		setPagination(initialData.pagination)
	}, [initialData])

	useEffect(() => {
		setSearch(initialSearch)
		setFilter(initialRole as UserFilter)
	}, [initialSearch, initialRole])

	const createURL = (
		newSearch: string,
		newFilter: string,
		newPage: number = 1,
	) => {
		const params = new URLSearchParams(searchParams)

		if (newSearch) {
			params.set("search", newSearch)
		} else {
			params.delete("search")
		}

		if (newFilter && newFilter !== "none") {
			params.set("role", newFilter)
		} else {
			params.delete("role")
		}

		if (newPage > 1) {
			params.set("page", newPage.toString())
		} else {
			params.delete("page")
		}

		const queryString = params.toString()
		return queryString ? `${pathname}?${queryString}` : pathname
	}

	useEffect(() => {
		if (debouncedSearch !== initialSearch) {
			const url = createURL(debouncedSearch, filter, 1)
			router.push(url)
		}
	}, [debouncedSearch, filter, initialSearch, pathname, router, searchParams])

	const handleFilterChange = (
		newFilter: UserFilter | ((prev: UserFilter) => UserFilter),
	) => {
		const filterValue =
			typeof newFilter === "function" ? newFilter(filter) : newFilter
		setFilter(filterValue)

		const url = createURL(search, filterValue, 1)
		router.push(url)
	}

	return (
		<>
			<UsersFilters
				search={search}
				setSearch={setSearch}
				filter={filter}
				setFilter={handleFilterChange}
			/>

			<AdminIsland className="flex flex-col gap-6">
				{users?.length > 0 ? (
					<>
						<Grid className="grid-cols-2 md:grid-cols-4!" gap="sm">
							{users.map(user => (
								<UserCardAdmin
									user={user}
									setUsers={setUsers}
									key={user._id}
								/>
							))}
						</Grid>

						<Pagination
							page={pagination.currentPage}
							totalPages={pagination.totalPages}
						/>
					</>
				) : (
					<Text>
						{search || filter !== "none"
							? "Your search did not return any result."
							: "No user yet."}
					</Text>
				)}
			</AdminIsland>
		</>
	)
}

interface IUsersList {
	initialData: ResponseInfiniteUsers
	initialSearch?: string
	initialRole?: string
}
