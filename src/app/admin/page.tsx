import type { Metadata } from "next"
import { AdminPage } from "components"
import { AdminHeader } from "./(admin-page)/admin-header"
import { AdminPostsList } from "./(admin-page)/posts-list"

export const metadata: Metadata = {
	title: "Admin",
}

export default function AdminAdmin() {
	return (
		<AdminPage>
			<AdminHeader />
			<AdminPostsList />
		</AdminPage>
	)
}
