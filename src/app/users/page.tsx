import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { userService } from "api"
import { UsersList } from "./users-list"
import type { ResponseInfiniteUsers } from "types"

async function getUsers() {
	return (await userService
		.allUsers({ limit: 24 })
		.then(res => res.data)
		.catch(err => {
			console.error(err)
			return null
		})) as ResponseInfiniteUsers
}

export const metadata: Metadata = {
	title: "Users",
}

export default async function Users() {
	const { users, pagination } = await getUsers()

	return (
		<Page type="all">
			<Text tag="h1">Users</Text>

			<UsersList initialUsers={users} initialPagination={pagination} />
		</Page>
	)
}
