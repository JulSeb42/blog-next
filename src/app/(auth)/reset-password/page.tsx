import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { ResetPasswordForm } from "./reset-password-form"

export const metadata: Metadata = {
	title: "Reset your password",
}

export default function ResetPassword() {
	return (
		<Page type="anon" mainSize="form">
			<Text tag="h1">Reset your password</Text>
			<ResetPasswordForm />
		</Page>
	)
}
