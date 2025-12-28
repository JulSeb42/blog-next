import type { Metadata } from "next"
import { Page } from "components"
import { SearchResults } from "./search-results"

export const metadata: Metadata = {
	title: "Search",
}

export default function Search() {
	return (
		<Page type="all">
			<SearchResults />
		</Page>
	)
}
