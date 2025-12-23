"use client"
import { useState } from "react"
import { useSearchParams, redirect } from "next/navigation"
import { Form, Input, passwordRegex, toast } from "@julseb-lib/react"
import { ErrorMessage } from "components"
import { authService } from "api"
import { COMMON_TEXTS } from "data"
import type { LibValidationStatus } from "@julseb-lib/react/types"
import type { IErrorMessage } from "types"

export function ResetPasswordForm() {
	const searchParams = useSearchParams()
	const id = searchParams.get("id")
	const token = searchParams.get("token")

	const [password, setPassword] = useState("")
	const [validation, setValidation] = useState<LibValidationStatus>(undefined)
	const [errorMessage, setErrorMessage] = useState<IErrorMessage>(undefined)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()

		setIsLoading(true)

		if (!passwordRegex.test(password)) {
			setValidation(false)
			return
		}

		if (!id) {
			setErrorMessage(COMMON_TEXTS.ERRORS.ID_MISSING)
			return
		}

		if (!token) {
			setErrorMessage(COMMON_TEXTS.ERRORS.TOKEN_MISSING)
			return
		}

		authService
			.resetPassword({ _id: id, password, resetToken: token })
			.then(res => toast.success(res.data.message))
			.then(() => setTimeout(() => redirect("/login"), 300))
			.catch(err => {
				console.error(err)
				setErrorMessage(err?.response?.data?.error || err.message)
			})
			.finally(() => setIsLoading(false))
	}

	return (
		<>
			<Form
				buttonPrimary="Save new password"
				buttonSecondary={{
					content: "Cancel",
					onClick: () => redirect("/login"),
				}}
				onSubmit={handleSubmit}
				isLoading={isLoading}
			>
				<Input
					label="New password"
					type="password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					validation={{
						status: validation,
						message: COMMON_TEXTS.ERRORS.PASSWORD_NOT_VALID,
					}}
				/>
			</Form>

			<ErrorMessage>{errorMessage}</ErrorMessage>
		</>
	)
}
