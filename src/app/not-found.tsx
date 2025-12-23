import type { Metadata } from "next"
import { NotFoundPage } from "components"

export const metadata: Metadata = {
	title: "404",
}

export default function NotFound() {
	return <NotFoundPage />
}
