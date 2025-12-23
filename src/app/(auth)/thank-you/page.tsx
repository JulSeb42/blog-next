import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"

export const metadata: Metadata = {
	title: "Thank You",
}

export default function ThankYou() {
	return (
		<Page type="protected">
			<Text tag="h1">Thank you for creating your account!</Text>

			<Text>
				You are now logged in. We just sent you an email to verify your
				account, please click on the link to access all the
				functionalities.
			</Text>
		</Page>
	)
}
