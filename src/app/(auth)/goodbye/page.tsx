import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"

export const metadata: Metadata = {
	title: "Goodbye!",
}

export default function Goodbye() {
	return (
		<Page type="anon">
			<Text tag="h1">We're sorry to see you go!</Text>

			<Text>Your account has been deleted successfully.</Text>
		</Page>
	)
}
