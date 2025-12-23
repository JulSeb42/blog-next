"use client"
import { useState } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Form, Input, InputCheck, Text } from "@julseb-lib/react"
import { ErrorMessage } from "components"
import { authService } from "api"
import { useAuth } from "context"
import type { IErrorMessage } from "types"

export function SignupForm() {
	const { refetch, setLoading } = useAuth()

	const [inputs, setInputs] = useState({
		fullName: "",
		email: "",
		password: "",
	})
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)
	const [saveEmail, setSaveEmail] = useState(false)

	const handleInputs = (e: ChangeEvent<HTMLInputElement>) =>
		setInputs({ ...inputs, [e.target.id]: e.target.value })

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setLoading(true)

		authService
			.signup(inputs)
			.then(() => {
				refetch()
				if (saveEmail) localStorage.setItem("email", inputs.email)
				setTimeout(() => redirect("/thank-you"), 500)
			})
			.catch(err =>
				setErrorMessage(err?.response?.data?.error || err.message),
			)
			.finally(() => {
				setIsLoading(false)
				setLoading(false)
			})
	}

	return (
		<>
			<Form
				buttonPrimary="Create your account"
				onSubmit={handleSubmit}
				className="w-full max-w-[400px]"
				isLoading={isLoading}
			>
				<Input
					label="Full name"
					id="fullName"
					value={inputs.fullName}
					onChange={handleInputs}
				/>

				<Input
					label="Email"
					id="email"
					value={inputs.email}
					onChange={handleInputs}
				/>

				<Input
					label="Password"
					id="password"
					type="password"
					value={inputs.password}
					onChange={handleInputs}
				/>

				<InputCheck
					id="save"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setSaveEmail(e.target.checked)
					}
					variant="toggle"
					checked={saveEmail}
				>
					Save your email for faster login?
				</InputCheck>
			</Form>

			<ErrorMessage>{errorMessage}</ErrorMessage>

			<Text>
				You already have an account? <Link href="/login">Log in.</Link>
			</Text>
		</>
	)
}
