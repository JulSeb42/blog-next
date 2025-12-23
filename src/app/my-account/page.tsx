import type { Metadata } from "next"
import Link from "next/link"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { UserHeader } from "./user-header"

export const metadata: Metadata = {
	title: "My Account",
}

export default function MyAccount() {
	return (
		<Page type="protected">
			<UserHeader />

			<Text>
				<Link href="/my-account/edit-account">Edit your account.</Link>
			</Text>
		</Page>
	)
}
