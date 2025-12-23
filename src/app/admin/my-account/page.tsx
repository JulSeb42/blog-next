import type { Metadata } from "next"
import Link from "next/link"
import { Text } from "@julseb-lib/react"
import { AdminPage, AdminIsland } from "components"
import { MyAccountForm } from "./my-account-form"

export const metadata: Metadata = {
	title: "My Account",
}

export default function AdminMyAccount() {
	return (
		<AdminPage mainSize="form">
			<AdminIsland>
				<Text tag="h1">My Account</Text>
			</AdminIsland>

			<AdminIsland>
				<MyAccountForm />
			</AdminIsland>

			<AdminIsland>
				<Text>
					<Link href="/admin/my-account/edit-password">
						Edit your password.
					</Link>
				</Text>
			</AdminIsland>
		</AdminPage>
	)
}
