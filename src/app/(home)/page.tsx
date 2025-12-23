import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { Greetings } from "./greetings"

export const metadata: Metadata = {
	title: "Homepage",
}

export default function Home() {
	return (
		<Page type="all">
			<Text tag="h1">Home</Text>
			<Greetings />
		</Page>
	)
}
