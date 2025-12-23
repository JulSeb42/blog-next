import type { Metadata } from "next"
import { AdminPage } from "components"
import { AdminHeader } from "./(admin-page)/admin-header"

export const metadata: Metadata = {
	title: "Admin",
}

export default function AdminAdmin() {
	return (
		<AdminPage>
			<AdminHeader />
		</AdminPage>
	)
}
