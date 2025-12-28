import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { AdminPage, AdminIsland } from "components"
import { CommentsList } from "./comments-list"

export const metadata: Metadata = {
	title: "Comments",
}

export default async function AdminComments() {
	return (
		<AdminPage>
			<AdminIsland>
				<Text tag="h1">Comments</Text>
			</AdminIsland>

			<CommentsList />
		</AdminPage>
	)
}
