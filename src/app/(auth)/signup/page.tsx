import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { SignupForm } from "./signup-form"

export const metadata: Metadata = {
	title: "Signup",
}

export default function Signup() {
	return (
		<Page type="anon" mainSize="form">
			<Text tag="h1">Signup</Text>
			<SignupForm />
		</Page>
	)
}
