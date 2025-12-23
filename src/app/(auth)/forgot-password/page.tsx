import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { ForgotPasswordForm } from "./forgot-password-form"

export const metadata: Metadata = {
	title: "I forgot my password",
}

export default function ForgotPassword() {
	return (
		<Page type="anon" mainSize="form">
			<Text tag="h1">I forgot my password</Text>

			<Text>
				Please enter your email address, we will send you a link to
				reset your password.
			</Text>

			<ForgotPasswordForm />
		</Page>
	)
}
