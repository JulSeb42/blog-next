import type { Metadata } from "next"
import Link from "next/link"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { EditAccountForm } from "./edit-account-form"
import { DeleteAccount } from "./delete-account"

export const metadata: Metadata = {
	title: "Edit your account",
}

export default function EditAccount() {
	return (
		<Page type="protected" mainSize="form">
			<Text tag="h1">Edit your account</Text>

			<EditAccountForm />

			<Text>
				<Link href="/my-account/edit-account/edit-password">
					Edit your password.
				</Link>
			</Text>

			<DeleteAccount />
		</Page>
	)
}
