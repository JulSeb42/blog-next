import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"

export const metadata: Metadata = {
	title: "Email has been sent",
}

export default function ForgotSent() {
	return (
		<Page type="anon">
			<Text tag="h1">Email sent successfully!</Text>

			<Text>
				We just sent you an email with a link to reset your password.
			</Text>
		</Page>
	)
}
