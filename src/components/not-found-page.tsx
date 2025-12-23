import Link from "next/link"
import { Text } from "@julseb-lib/react"
import { Page } from "components/layouts/page"

export function NotFoundPage() {
	return (
		<Page type="all">
			<Text tag="h1">This page does not exist</Text>

			<Text>
				The page you're looking for does not exist.{" "}
				<Link href="/">Back to homepage.</Link>
			</Text>
		</Page>
	)
}
