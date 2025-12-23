import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { EditPasswordForm } from "./edit-password-form"

export const metadata: Metadata = {
	title: "Edit your password",
}

export default function EditPassword() {
	return (
		<Page type="protected" mainSize="form">
			<Text tag="h1">Edit your password</Text>
			<EditPasswordForm />
		</Page>
	)
}
