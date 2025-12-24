import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { AuthorsList } from "./authors-list"
import { userService } from "api"
import type { ServerPagination, User } from "types"

async function getUsers(): Promise<{
	users: Array<User>
	pagination: ServerPagination
}> {
	return await userService
		.allUsers({ fields: "_id fullName avatar slug bio" })
		.then(res => res.data)
		.catch(err => err)
}

export const metadata: Metadata = {
	title: "Authors",
}

export default async function Authors() {
	const { users, pagination } = await getUsers()

	return (
		<Page type="all">
			<Text tag="h1">Authors</Text>

			{/* <ul>
				{users.map(user => (
					<li key={user._id}>"{user._id}",</li>
				))}
			</ul> */}

			<AuthorsList authors={users} pagination={pagination} />
		</Page>
	)
}
