import Link from "next/link"
import type { Metadata } from "next"
import { Text } from "@julseb-lib/react"
import { Page } from "components"
import { LoginForm } from "./login-form"
import { DemoLogin } from "./demo-login"

export const metadata: Metadata = {
	title: "Login",
}

export default function Login() {
	return (
		<Page type="anon" mainSize="form">
			<Text tag="h1">Login</Text>
			<LoginForm />

			<Text>
				<Link href="/forgot-password">I forgot my password.</Link>
			</Text>

			<Text>
				You don't have an account? <Link href="/signup">Sign up.</Link>
			</Text>

			<DemoLogin />
		</Page>
	)
}
