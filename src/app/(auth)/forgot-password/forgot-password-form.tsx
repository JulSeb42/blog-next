"use client"
import { useState } from "react"
import { redirect } from "next/navigation"
import { emailRegex, Form, Input } from "@julseb-lib/react"
import { ErrorMessage } from "components"
import { authService } from "api"
import { COMMON_TEXTS } from "data"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import type { IErrorMessage } from "types"

export function ForgotPasswordForm() {
	const [email, setEmail] = useState(localStorage.getItem("email") ?? "")
	const [isLoading, setIsLoading] = useState(false)
	const [validation, setValidation] = useState<LibValidationStatus>(undefined)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)

		if (!emailRegex.test(email)) {
			setValidation(false)
			return
		} else if (validation && emailRegex.test(email)) {
			setValidation(true)
		}

		authService
			.forgotPassword({ email })
			.then(() => setTimeout(() => redirect("/forgot-sent"), 300))
			.catch(err => {
				console.error(err)
				setErrorMessage(err.response.data.message)
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			<Form
				buttonPrimary="Send"
				buttonSecondary={{
					content: "Cancel",
					onClick: () => redirect("/login"),
				}}
				onSubmit={handleSubmit}
				isLoading={isLoading}
			>
				<Input
					type="email"
					label="Your email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					validation={{
						status: validation,
						message: COMMON_TEXTS.ERRORS.EMAIL_NOT_VALID,
					}}
				/>
			</Form>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}
