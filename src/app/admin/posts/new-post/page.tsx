import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { AdminPage, AdminIsland, PostForm } from "components"

export const metadata: Metadata = {
	title: "New Post",
}

export default function AdminNewPost() {
	return (
		<AdminPage>
			<AdminIsland>
				<Text tag="h1">New Post</Text>
			</AdminIsland>

			<PostForm />
		</AdminPage>
	)
}
