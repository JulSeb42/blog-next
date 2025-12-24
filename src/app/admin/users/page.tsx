import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { AdminPage, AdminIsland } from "components"
import { userService } from "api"
import { UsersList } from "./users-list"
import type { ResponseInfiniteUsers } from "types"

export const metadata: Metadata = {
	title: "Users",
}

interface PageProps {
	searchParams: Promise<{
		page?: string
		search?: string
		role?: string
	}>
}

async function getUsersData(page: number, search?: string, role?: string) {
	return (await userService
		.allUsers({ page, search, role, fields: "_id fullName avatar role" })
		.then(res => res.data)
		.catch(err => console.error(err))) as ResponseInfiniteUsers
}

export default async function AdminUsers({ searchParams }: PageProps) {
	const params = await searchParams
	const page = Number(params.page) || 1
	const search = params.search || ""
	const role = params.role || "none"

	const usersData = await getUsersData(page, search, role)

	return (
		<AdminPage>
			<AdminIsland>
				<Text tag="h1">Users</Text>
			</AdminIsland>

			<UsersList
				initialData={usersData}
				initialSearch={search}
				initialRole={role}
			/>
		</AdminPage>
	)
}
